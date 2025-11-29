import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { Role } from '@prisma/client';
import { 
  getAllTherapistsHandler, 
  updateTherapistStatusHandler,
  getTherapistSessionsHandler,
  getAllChildrenHandler,
  getChildSessionsHandler,
  getAllBookingsHandler,
  getProfileHandler,
  updateProfileHandler,
  getPlatformSettingsHandler,
  updatePlatformSettingsHandler,
  listLeaveRequestsHandler,
  approveLeaveRequestHandler,
  rejectLeaveRequestHandler,
  getAllConsultationsHandler,
  updateConsultationHandler
} from './admin.controller';
import { processLeaveHandler, getLeaveDetailsHandler, getAllLeavesHandler } from '../../leaves/leave.controller';
import { processLeaveParamsSchema, processLeaveBodySchema, getLeaveByIdSchema } from '../../leaves/leave.validation';
import { updateTherapistStatusSchema } from './admin.validation';

const router = Router();

// All routes in this file are protected and for Admins only
router.use(authenticate, authorize([Role.ADMIN]));

// Therapist management
router.get('/therapists', getAllTherapistsHandler);
router.get('/therapists/:therapistId/sessions', getTherapistSessionsHandler);
router.patch('/therapists/:therapistId/status', validate(updateTherapistStatusSchema), updateTherapistStatusHandler);

// Children management
router.get('/children', getAllChildrenHandler);
router.get('/children/:childId/sessions', getChildSessionsHandler);

// Bookings management
router.get('/bookings', getAllBookingsHandler);

// Profile management
router.get('/profile', getProfileHandler);
router.put('/profile', updateProfileHandler);

// Platform settings
router.get('/settings', getPlatformSettingsHandler);
router.put('/settings', updatePlatformSettingsHandler);

// Leave requests management
// Use the newer leave management routes from leave.route.ts for better validation and error handling
router.get('/leaves', getAllLeavesHandler); // Get all leaves with optional status filter
router.get('/leaves/:leaveId', validate({ params: getLeaveByIdSchema.shape.params }), getLeaveDetailsHandler); // Get leave details
router.put('/leaves/:leaveId', validate({ params: processLeaveParamsSchema, body: processLeaveBodySchema }), processLeaveHandler); // Approve/Reject leave
// Keep old routes for backward compatibility (can be removed later)
router.post('/leaves/:leaveId/approve', approveLeaveRequestHandler);
router.post('/leaves/:leaveId/reject', rejectLeaveRequestHandler);

// Consultations management
router.get('/consultations', getAllConsultationsHandler);
router.patch('/consultations/:consultationId', updateConsultationHandler);

export default router;