/*
  Warnings:

  - You are about to drop the column `asigneeId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_asigneeId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "asigneeId",
ADD COLUMN     "assigneeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
