/*
  Warnings:

  - Added the required column `ageRating` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "actors" TEXT[],
ADD COLUMN     "ageRating" INTEGER NOT NULL,
ADD COLUMN     "directors" TEXT[];
