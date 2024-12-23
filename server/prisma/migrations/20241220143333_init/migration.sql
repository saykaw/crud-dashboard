/*
  Warnings:

  - The `courses` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "courses",
ADD COLUMN     "courses" TEXT[],
ALTER COLUMN "lastLogin" SET DATA TYPE TIMESTAMP(3);
