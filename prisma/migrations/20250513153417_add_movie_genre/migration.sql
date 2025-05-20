/*
  Warnings:

  - You are about to drop the `_MovieToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieToGenre" DROP CONSTRAINT "_MovieToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToGenre" DROP CONSTRAINT "_MovieToGenre_B_fkey";

-- DropTable
DROP TABLE "_MovieToGenre";

-- CreateTable
CREATE TABLE "MovieGenre" (
    "id" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "genreId" UUID NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieGenre_movieId_genreId_key" ON "MovieGenre"("movieId", "genreId");

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
