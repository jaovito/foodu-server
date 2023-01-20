/*
  Warnings:

  - The values [CREATOR] on the enum `RolesEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `signals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutorials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FoodSize" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterEnum
BEGIN;
CREATE TYPE "RolesEnum_new" AS ENUM ('ADMIN', 'CHEF', 'BLOCKED');
ALTER TABLE "roles" ALTER COLUMN "name" TYPE "RolesEnum_new" USING ("name"::text::"RolesEnum_new");
ALTER TYPE "RolesEnum" RENAME TO "RolesEnum_old";
ALTER TYPE "RolesEnum_new" RENAME TO "RolesEnum";
DROP TYPE "RolesEnum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_file_id_fkey";

-- DropForeignKey
ALTER TABLE "signals" DROP CONSTRAINT "signals_file_id_fkey";

-- DropForeignKey
ALTER TABLE "signals" DROP CONSTRAINT "signals_product_id_fkey";

-- DropForeignKey
ALTER TABLE "tutorials" DROP CONSTRAINT "tutorials_file_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_products" DROP CONSTRAINT "users_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_products" DROP CONSTRAINT "users_on_products_user_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_file_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "description",
ADD COLUMN     "file_id" TEXT,
ADD COLUMN     "food_id" TEXT,
ADD COLUMN     "restaurant_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "file_id" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "signals";

-- DropTable
DROP TABLE "tutorials";

-- DropTable
DROP TABLE "users_on_products";

-- DropTable
DROP TABLE "videos";

-- DropEnum
DROP TYPE "SignalStatus";

-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighbourhood" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "size" "FoodSize" NOT NULL DEFAULT 'MEDIUM',
    "energy" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods_on_users" (
    "quantity" INTEGER NOT NULL,
    "delivery_time" TIMESTAMP(3) NOT NULL,
    "food_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "foods_on_users_pkey" PRIMARY KEY ("food_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_id_key" ON "restaurants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "foods_id_key" ON "foods"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods_on_users" ADD CONSTRAINT "foods_on_users_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods_on_users" ADD CONSTRAINT "foods_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
