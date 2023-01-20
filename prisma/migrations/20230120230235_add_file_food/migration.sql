-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "file_id" TEXT;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
