/*
  Warnings:

  - The `win` column on the `signals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SignalStatus" AS ENUM ('WIN', 'LOSS', 'PENDING');

-- AlterTable
ALTER TABLE "signals" DROP COLUMN "win",
ADD COLUMN     "win" "SignalStatus" NOT NULL DEFAULT 'PENDING';
