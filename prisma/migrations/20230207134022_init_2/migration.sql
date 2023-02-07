/*
  Warnings:

  - You are about to drop the column `mark1` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mark2` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mark3` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "mark1",
DROP COLUMN "mark2",
DROP COLUMN "mark3";
