/*
  Warnings:

  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceRecipient" DROP CONSTRAINT "ServiceRecipient_donationId_fkey";

-- DropTable
DROP TABLE "Donation";

-- CreateTable
CREATE TABLE "donationSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "donationSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceRecipient" ADD CONSTRAINT "ServiceRecipient_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donationSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
