"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const consultation_controller_1 = require("./consultation.controller");
const consultation_validation_1 = require("./consultation.validation");
const router = (0, express_1.Router)();
// Public route - anyone can submit a consultation request
router.post('/', (0, validate_middleware_1.validate)(consultation_validation_1.createConsultationSchema), consultation_controller_1.createConsultationHandler);
// Admin only route - get all consultations (moved to admin routes for consistency)
// This will be handled in admin routes
exports.default = router;
