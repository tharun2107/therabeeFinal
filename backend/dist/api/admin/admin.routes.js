"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const client_1 = require("@prisma/client");
const admin_controller_1 = require("./admin.controller");
const leave_controller_1 = require("../../leaves/leave.controller");
const leave_validation_1 = require("../../leaves/leave.validation");
const admin_validation_1 = require("./admin.validation");
const router = (0, express_1.Router)();
// All routes in this file are protected and for Admins only
router.use(auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.Role.ADMIN]));
// Therapist management
router.get('/therapists', admin_controller_1.getAllTherapistsHandler);
router.get('/therapists/:therapistId/sessions', admin_controller_1.getTherapistSessionsHandler);
router.patch('/therapists/:therapistId/status', (0, validate_middleware_1.validate)(admin_validation_1.updateTherapistStatusSchema), admin_controller_1.updateTherapistStatusHandler);
// Children management
router.get('/children', admin_controller_1.getAllChildrenHandler);
router.get('/children/:childId/sessions', admin_controller_1.getChildSessionsHandler);
// Bookings management
router.get('/bookings', admin_controller_1.getAllBookingsHandler);
// Profile management
router.get('/profile', admin_controller_1.getProfileHandler);
router.put('/profile', admin_controller_1.updateProfileHandler);
// Platform settings
router.get('/settings', admin_controller_1.getPlatformSettingsHandler);
router.put('/settings', admin_controller_1.updatePlatformSettingsHandler);
// Leave requests management
// Use the newer leave management routes from leave.route.ts for better validation and error handling
router.get('/leaves', leave_controller_1.getAllLeavesHandler); // Get all leaves with optional status filter
router.get('/leaves/:leaveId', (0, validate_middleware_1.validate)({ params: leave_validation_1.getLeaveByIdSchema.shape.params }), leave_controller_1.getLeaveDetailsHandler); // Get leave details
router.put('/leaves/:leaveId', (0, validate_middleware_1.validate)({ params: leave_validation_1.processLeaveParamsSchema, body: leave_validation_1.processLeaveBodySchema }), leave_controller_1.processLeaveHandler); // Approve/Reject leave
// Keep old routes for backward compatibility (can be removed later)
router.post('/leaves/:leaveId/approve', admin_controller_1.approveLeaveRequestHandler);
router.post('/leaves/:leaveId/reject', admin_controller_1.rejectLeaveRequestHandler);
// Consultations management
router.get('/consultations', admin_controller_1.getAllConsultationsHandler);
router.patch('/consultations/:consultationId', admin_controller_1.updateConsultationHandler);
exports.default = router;
