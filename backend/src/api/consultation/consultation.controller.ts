import type { Request, Response } from 'express';
import * as consultationService from './consultation.service';

export const createConsultationHandler = async (req: Request, res: Response) => {
  try {
    const consultation = await consultationService.createConsultation(req.body);
    res.status(201).json({
      message: 'Consultation request submitted successfully',
      data: consultation,
    });
  } catch (error: any) {
    console.error('[consultation.controller.createConsultationHandler] Error:', error);
    res.status(500).json({ message: error.message || 'Failed to submit consultation request' });
  }
};

export const getAllConsultationsHandler = async (req: Request, res: Response) => {
  try {
    const consultations = await consultationService.getAllConsultations();
    res.status(200).json(consultations);
  } catch (error: any) {
    console.error('[consultation.controller.getAllConsultationsHandler] Error:', error);
    res.status(500).json({ message: 'Failed to retrieve consultations' });
  }
};

