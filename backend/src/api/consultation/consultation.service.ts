import prisma from '../../utils/prisma';

export const createConsultation = async (data: {
  name: string;
  phone: string;
  reason: string;
}) => {
  const consultation = await prisma.consultation.create({
    data: {
      name: data.name,
      phone: data.phone,
      reason: data.reason,
    },
  });

  return consultation;
};

export const getAllConsultations = async () => {
  const consultations = await prisma.consultation.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return consultations;
};

