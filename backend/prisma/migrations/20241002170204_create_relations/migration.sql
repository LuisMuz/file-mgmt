/*
  Warnings:

  - You are about to drop the column `id_user` on the `FileUser` table. All the data in the column will be lost.
  - You are about to drop the `LinkProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `project_id` to the `FileUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `FileUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileUser" DROP COLUMN "id_user",
ADD COLUMN     "project_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_auth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "LinkProject";

-- AddForeignKey
ALTER TABLE "FileUser" ADD CONSTRAINT "FileUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUser" ADD CONSTRAINT "FileUser_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id_project") ON DELETE RESTRICT ON UPDATE CASCADE;
