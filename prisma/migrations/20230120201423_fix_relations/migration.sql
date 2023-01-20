/*
  Warnings:

  - You are about to drop the column `food_id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_id` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_food_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "food_id",
DROP COLUMN "restaurant_id";

-- CreateTable
CREATE TABLE "categories_on_foods" (
    "category_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,

    CONSTRAINT "categories_on_foods_pkey" PRIMARY KEY ("category_id","food_id")
);

-- CreateTable
CREATE TABLE "categories_on_restaurants" (
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "categories_on_restaurants_pkey" PRIMARY KEY ("category_id","restaurant_id")
);

-- AddForeignKey
ALTER TABLE "categories_on_foods" ADD CONSTRAINT "categories_on_foods_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_foods" ADD CONSTRAINT "categories_on_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_restaurants" ADD CONSTRAINT "categories_on_restaurants_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_restaurants" ADD CONSTRAINT "categories_on_restaurants_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
