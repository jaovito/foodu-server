/*
  Warnings:

  - Added the required column `date` to the `signals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `signals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "signals" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
