/*
  Warnings:

  - You are about to drop the `Complaint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_complainCategory_fkey";

-- DropTable
DROP TABLE "Complaint";

-- CreateTable
CREATE TABLE "Complain" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT,
    "location" TEXT NOT NULL,
    "complainCategory" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Complain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Complain" ADD CONSTRAINT "Complain_complainCategory_fkey" FOREIGN KEY ("complainCategory") REFERENCES "ComplaintCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
