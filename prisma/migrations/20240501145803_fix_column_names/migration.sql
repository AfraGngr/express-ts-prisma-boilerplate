/*
  Warnings:

  - A unique constraint covering the columns `[book_id,user_id]` on the table `borrowed_books` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "borrowed_books" DROP CONSTRAINT "borrowed_books_book_id_fkey";

-- DropForeignKey
ALTER TABLE "borrowed_books" DROP CONSTRAINT "borrowed_books_user_id_fkey";

-- DropIndex
DROP INDEX "borrowed_books_user_id_book_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "borrowed_books_book_id_user_id_key" ON "borrowed_books"("book_id", "user_id");

-- AddForeignKey
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
