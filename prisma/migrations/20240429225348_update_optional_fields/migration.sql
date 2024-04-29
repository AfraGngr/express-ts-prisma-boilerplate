-- AlterTable
ALTER TABLE "book_reviews" ALTER COLUMN "review" DROP NOT NULL;

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "borrowed" SET DEFAULT false,
ALTER COLUMN "imagePath" DROP NOT NULL;

-- AlterTable
ALTER TABLE "borrowed_books" ALTER COLUMN "return_date" DROP NOT NULL;
