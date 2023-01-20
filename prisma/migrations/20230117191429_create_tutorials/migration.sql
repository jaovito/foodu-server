-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "tutorials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vimeo_id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "file_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutorials_id_key" ON "tutorials"("id");

-- AddForeignKey
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
