/*
  Warnings:

  - Made the column `type` on table `Ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priority` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'BUG',
ALTER COLUMN "priority" SET NOT NULL,
ALTER COLUMN "priority" SET DEFAULT 'NORMAL';
