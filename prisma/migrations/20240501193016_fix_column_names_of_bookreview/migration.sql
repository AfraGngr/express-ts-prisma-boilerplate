/*
  Warnings:

  - A unique constraint covering the columns `[book_id,user_id]` on the table `book_reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "book_reviews" DROP CONSTRAINT "book_reviews_book_id_fkey";

-- DropForeignKey
ALTER TABLE "book_reviews" DROP CONSTRAINT "book_reviews_user_id_fkey";

-- DropIndex
DROP INDEX "book_reviews_user_id_book_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "book_reviews_book_id_user_id_key" ON "book_reviews"("book_id", "user_id");

-- AddForeignKey
ALTER TABLE "book_reviews" ADD CONSTRAINT "book_reviews_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_reviews" ADD CONSTRAINT "book_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
