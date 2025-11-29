-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "adminNotes" TEXT,
ADD COLUMN     "called" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Consultation_called_idx" ON "Consultation"("called");
