-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "reason" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Consultation_phone_idx" ON "Consultation"("phone");

-- CreateIndex
CREATE INDEX "Consultation_createdAt_idx" ON "Consultation"("createdAt");
