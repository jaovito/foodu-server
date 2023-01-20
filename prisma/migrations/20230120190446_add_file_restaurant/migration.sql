-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "file_id" TEXT;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
