-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "price" DECIMAL NOT NULL DEFAULT 0.00,
    "image_path" TEXT NOT NULL
);
