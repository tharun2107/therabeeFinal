import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { Role } from '@prisma/client';
import {
  createConsultationHandler,
  getAllConsultationsHandler,
} from './consultation.controller';
import { createConsultationSchema } from './consultation.validation';

const router = Router();

// Public route - anyone can submit a consultation request
router.post('/', validate(createConsultationSchema), createConsultationHandler);

// Admin only route - get all consultations (moved to admin routes for consistency)
// This will be handled in admin routes

export default router;

