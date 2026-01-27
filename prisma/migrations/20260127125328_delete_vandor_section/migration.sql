/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_vendorId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "vendorId";

-- DropTable
DROP TABLE "Vendor";
