# Complete Timezone Logic Flow: Frontend to Backend

## Scenario
- **Therapist Location**: India (IST - UTC+5:30)
- **Parent Location**: Canada (EST - UTC-5:00)
- **Slot to Book**: 7:00 PM (19:00 in 24-hour format)
- **Date**: November 17, 2025

---

## 🎯 Core Principle

**All slots are stored as UTC with LITERAL hours/minutes.**
- `19:00 UTC` means "7:00 PM display time" regardless of timezone
- The hour value (19) represents the literal display time, not an actual UTC moment
- Frontend extracts UTC hours and displays them as local time

---

## 📋 Complete Flow Breakdown

### **PHASE 1: Therapist Sets Up Available Slots (India)**

#### Step 1.1: Therapist Creates Time Slots
**Location**: `frontend/src/pages/TherapistDashboard.tsx` or `CreateTimeSlotsModal.tsx`

```typescript
// Therapist selects: 7:00 PM, 8:00 PM, 9:00 PM
// Stored as: ["19:00", "20:00", "21:00"]
// These are just STRINGS, not timezone-aware
```

**API Call**: `PUT /api/therapists/me/slots/available-times`
```json
{
  "slotTimes": ["19:00", "20:00", "21:00"]
}
```

#### Step 1.2: Backend Stores Slot Times
**Location**: `backend/src/api/slots/slots.service.ts`

```typescript
// Backend receives: ["19:00", "20:00", "21:00"]
// Stores in database as-is (string array)
// No timezone conversion happens here - these are just time strings
```

**Database Storage**:
```json
{
  "selectedSlots": ["19:00", "20:00", "21:00"]
}
```

---

### **PHASE 2: Parent Views Available Slots (Canada)**

#### Step 2.1: Parent Opens Booking Modal
**Location**: `frontend/src/components/BookMonthlySessionModal.tsx`

**API Call**: `GET /api/parents/therapists`
- Returns therapist profile with `selectedSlots: ["19:00", "20:00", "21:00"]`

#### Step 2.2: Frontend Displays Slots
**Location**: `frontend/src/components/BookMonthlySessionModal.tsx` (lines 591-605)

```typescript
// Available slots come as strings: ["19:00", "20:00", "21:00"]
availableSlots.map((time: string) => {
  // Parse the time string
  const [hours, minutes] = time.split(':').map(Number)  // hours=19, minutes=0
  
  // Create a display date (year 2000 is arbitrary, just for formatting)
  const displayDate = new Date(2000, 0, 1, hours, minutes)  // 19:00 local time
  
  // Format as 12-hour time
  const displayTime = displayDate.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true  // Converts 19:00 → "7:00 PM"
  })
  
  // Parent in Canada sees: "7:00 PM" ✅
})
```

**Result**: Parent sees **"7:00 PM"** in the UI (correct!)

---

### **PHASE 3: Parent Selects Date and Books**

#### Step 3.1: Parent Selects Date
**Location**: `frontend/src/components/BookMonthlySessionModal.tsx`

```typescript
// Parent selects: November 17, 2025
selectedStartDate = "2025-11-17"  // YYYY-MM-DD format (no timezone)
```

#### Step 3.2: Parent Selects Time Slot
```typescript
// Parent clicks on "7:00 PM" slot
selectedSlotTime = "19:00"  // The original string from therapist's slots
```

#### Step 3.3: Frontend Sends Booking Request
**Location**: `frontend/src/components/BookMonthlySessionModal.tsx` (line 333)

**API Call**: `POST /api/parent/recurring-bookings`
```json
{
  "childId": "child123",
  "therapistId": "therapist456",
  "slotTime": "19:00",           // ← String, not a Date object
  "recurrencePattern": "DAILY",
  "startDate": "2025-11-17",     // ← YYYY-MM-DD string
  "endDate": "2025-12-16"
}
```

**Key Point**: Frontend sends:
- `slotTime` as a **string** ("19:00") - no timezone conversion
- `startDate` as a **date string** ("2025-11-17") - no timezone

---

### **PHASE 4: Backend Processes Booking**

#### Step 4.1: Controller Receives Request
**Location**: `backend/src/api/booking/booking.controller.ts` (line 1121)

```typescript
export const createRecurringBookingHandler = async (req: Request, res: Response) => {
  const bookingData = req.body;  // Receives the JSON above
  // bookingData.slotTime = "19:00" (string)
  // bookingData.startDate = "2025-11-17" (string)
}
```

#### Step 4.2: Service Creates Recurring Booking
**Location**: `backend/src/api/booking/booking.service.ts` (line 440)

```typescript
async createRecurringBooking(userId: string, input: RecurringBookingInput) {
  // input.slotTime = "19:00"
  // input.startDate = "2025-11-17"
  
  // Parse slot time
  const [hours, minutes] = input.slotTime.split(':').map(Number)
  // hours = 19, minutes = 0
  
  // Parse start date
  const startDate = new Date(input.startDate)  // "2025-11-17"
  // JavaScript creates: 2025-11-17T00:00:00.000Z (UTC midnight)
}
```

#### Step 4.3: Generate Individual Bookings
**Location**: `backend/src/api/booking/booking.service.ts` (line 591)

For each date in the range (Nov 17 - Dec 16, weekdays only):

```typescript
// For date: November 17, 2025
const date = new Date("2025-11-17")  // 2025-11-17T00:00:00.000Z

// Extract UTC date components
const year = date.getUTCFullYear()    // 2025
const month = date.getUTCMonth()      // 10 (November, 0-indexed)
const day = date.getUTCDate()         // 17

// Create slot start time using Date.UTC()
// This is the KEY: We use Date.UTC() to store literal hours
const slotStart = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0))
// Date.UTC(2025, 10, 17, 19, 0, 0, 0)
// Creates: 2025-11-17T19:00:00.000Z

// slotStart represents: "November 17, 2025 at 19:00 UTC"
// But we interpret this as: "November 17, 2025 at 7:00 PM (literal time)"
```

**Database Storage**:
```json
{
  "startTime": "2025-11-17T19:00:00.000Z",  // Stored as UTC
  "endTime": "2025-11-17T20:00:00.000Z"
}
```

**Critical Understanding**:
- The database stores: `2025-11-17T19:00:00.000Z`
- This is a valid UTC timestamp
- But we **interpret** the hour (19) as a literal display time
- Not as "7 PM in UTC", but as "7 PM (the time slot)"

---

### **PHASE 5: Frontend Retrieves and Displays Booked Slots**

#### Step 5.1: Parent Views Their Bookings
**Location**: `frontend/src/components/CurrentSessions.tsx` or `SessionDetails.tsx`

**API Call**: `GET /api/parent/bookings`
- Returns bookings with `timeSlot.startTime: "2025-11-17T19:00:00.000Z"`

#### Step 5.2: Frontend Formats Time for Display
**Location**: `frontend/src/components/SessionDetails.tsx` (line 189)

```typescript
const formatTime = (dateString: string) => {
  // dateString = "2025-11-17T19:00:00.000Z"
  
  const slotDate = new Date(dateString)
  // JavaScript creates Date object: 2025-11-17T19:00:00.000Z
  
  // Extract UTC hours/minutes (NOT local hours)
  const utcHours = slotDate.getUTCHours()      // 19 ✅
  const utcMinutes = slotDate.getUTCMinutes()  // 0 ✅
  
  // Create display date with UTC hours (treating as local time)
  const displayDate = new Date(2000, 0, 1, utcHours, utcMinutes)
  // Creates: January 1, 2000 at 19:00 (local time)
  
  // Format as 12-hour time
  return displayDate.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  })
  // Returns: "7:00 PM" ✅
}
```

**Result**: Parent in Canada sees **"7:00 PM"** ✅

#### Step 5.3: Therapist Views Their Bookings (India)
**Location**: Same components, same logic

```typescript
// Therapist in India receives: "2025-11-17T19:00:00.000Z"
const utcHours = slotDate.getUTCHours()  // 19
// Displays: "7:00 PM" ✅
```

**Result**: Therapist in India also sees **"7:00 PM"** ✅

---

## 🔍 Why This Works

### The Magic: `getUTCHours()` vs `getHours()`

**❌ WRONG (Old Code)**:
```typescript
const slotDate = new Date("2025-11-17T19:00:00.000Z")
const localHours = slotDate.getHours()  // Converts to local timezone!

// In Canada (EST, UTC-5):
// 19:00 UTC → 14:00 EST (2:00 PM) ❌ WRONG!

// In India (IST, UTC+5:30):
// 19:00 UTC → 00:30 IST next day (12:30 AM) ❌ WRONG!
```

**✅ CORRECT (New Code)**:
```typescript
const slotDate = new Date("2025-11-17T19:00:00.000Z")
const utcHours = slotDate.getUTCHours()  // Always returns 19, regardless of timezone!

// In Canada: utcHours = 19 → Display "7:00 PM" ✅
// In India: utcHours = 19 → Display "7:00 PM" ✅
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ THERAPIST (India) Sets Up Slots                            │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ Selects: 7 PM, 8 PM, 9 PM
                    ▼
        ┌───────────────────────────┐
        │ Frontend: ["19:00", ...] │  (String array)
        └───────────────────────────┘
                    │
                    │ POST /api/therapists/me/slots/available-times
                    ▼
        ┌───────────────────────────┐
        │ Backend: Store as strings │  (No timezone conversion)
        │ Database: selectedSlots   │
        └───────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PARENT (Canada) Views & Books                               │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ GET /api/parents/therapists
                    ▼
        ┌───────────────────────────┐
        │ Receives: ["19:00", ...] │
        └───────────────────────────┘
                    │
                    │ Frontend displays: "7:00 PM"
                    │ (Using toLocaleTimeString with hours=19)
                    ▼
        ┌───────────────────────────┐
        │ Parent selects: "19:00"   │
        │ Date: "2025-11-17"        │
        └───────────────────────────┘
                    │
                    │ POST /api/parent/recurring-bookings
                    │ { slotTime: "19:00", startDate: "2025-11-17" }
                    ▼
        ┌──────────────────────────────────────────┐
        │ Backend: Create slots using Date.UTC()   │
        │ Date.UTC(2025, 10, 17, 19, 0, 0, 0)      │
        │ Result: 2025-11-17T19:00:00.000Z         │
        └──────────────────────────────────────────┘
                    │
                    │ Store in database
                    ▼
        ┌──────────────────────────────────────────┐
        │ Database: startTime = "2025-11-17T19:00:00.000Z" │
        └──────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DISPLAY BOOKED SLOTS                                        │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ GET /api/parent/bookings
                    ▼
        ┌──────────────────────────────────────────┐
        │ Receives: startTime = "2025-11-17T19:00:00.000Z" │
        └──────────────────────────────────────────┘
                    │
                    │ Frontend: slotDate.getUTCHours()
                    │ Returns: 19 (always, regardless of timezone)
                    ▼
        ┌───────────────────────────┐
        │ Display: "7:00 PM"        │
        │ (Same for both users!)    │
        └───────────────────────────┘
```

---

## 🎯 Key Takeaways

1. **Storage**: Slots stored as UTC timestamps with literal hours
   - `19:00 UTC` means "7 PM slot", not "7 PM in UTC timezone"

2. **Display**: Frontend uses `getUTCHours()` to extract literal hours
   - Never uses `getHours()` which converts to local timezone

3. **Consistency**: Same time displayed to all users
   - Parent in Canada: "7:00 PM"
   - Therapist in India: "7:00 PM"
   - Both see the same literal time

4. **No Timezone Conversion**: The hour value (19) is treated as a literal display time, not a timezone-aware moment

---

## 🔧 Code Locations Summary

### Backend
- **Slot Creation**: `backend/src/api/booking/booking.service.ts` (line 702)
  - Uses `Date.UTC()` to create slots with literal hours

- **Availability Check**: `backend/src/api/booking/booking.service.ts` (line 517)
  - Uses `Date.UTC()` for consistency

### Frontend
- **Slot Display**: 
  - `frontend/src/components/BookMonthlySessionModal.tsx` (line 591)
  - `frontend/src/components/SessionDetails.tsx` (line 189)
  - `frontend/src/components/CurrentSessions.tsx` (line 176)
  - All use `getUTCHours()` / `getUTCMinutes()`

- **Availability Check**: 
  - `frontend/src/components/BookMonthlySessionModal.tsx` (line 208)
  - `frontend/src/pages/TherapistDashboard.tsx` (line 413)
  - All use `getUTCHours()` / `getUTCMinutes()`

---

## ✅ Testing Checklist

- [x] Therapist in India sets slots: 7 PM, 8 PM, 9 PM
- [x] Parent in Canada sees: 7:00 PM, 8:00 PM, 9:00 PM
- [x] Parent books 7:00 PM slot
- [x] Backend stores: `2025-11-17T19:00:00.000Z`
- [x] Parent views booking: Shows "7:00 PM"
- [x] Therapist views booking: Shows "7:00 PM"
- [x] Both users see the same time ✅

---

## 🚨 Common Pitfalls (Now Fixed)

1. **Using `setHours()` instead of `Date.UTC()`**
   - ❌ Old: `slotStart.setHours(19, 0, 0, 0)` - Uses server timezone
   - ✅ New: `Date.UTC(year, month, day, 19, 0, 0, 0)` - Uses UTC

2. **Using `getHours()` instead of `getUTCHours()`**
   - ❌ Old: `slotDate.getHours()` - Converts to local timezone
   - ✅ New: `slotDate.getUTCHours()` - Always returns literal hour

3. **Timezone conversion on display**
   - ❌ Old: Converting UTC to local time for display
   - ✅ New: Extract UTC hours and display as-is

---

This architecture ensures that **time slots are timezone-agnostic** - they represent literal display times that everyone sees the same way, regardless of their physical location.

