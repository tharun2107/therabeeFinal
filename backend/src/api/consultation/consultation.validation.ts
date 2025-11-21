import { z } from 'zod';

export const createConsultationSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone number is required'),
    reason: z.string().min(1, 'Reason for consultation is required'),
  }),
};

