/*
  Warnings:

  - You are about to drop the column `answer` on the `Captcha` table. All the data in the column will be lost.
  - Added the required column `text` to the `Captcha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Captcha" DROP COLUMN "answer",
ADD COLUMN     "text" TEXT NOT NULL;
