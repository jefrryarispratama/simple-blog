/*
  Warnings:

  - You are about to drop the column `Desc` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Blog] DROP COLUMN [Desc],
[Title];
ALTER TABLE [dbo].[Blog] ADD [desc] NVARCHAR(1000) NOT NULL,
[title] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
