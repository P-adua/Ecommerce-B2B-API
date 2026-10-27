/*
  Warnings:

  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specInterface` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specPower` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specSpeed` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warranty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Product] ADD [description] NVARCHAR(1000) NOT NULL,
[image] NVARCHAR(1000) NOT NULL,
[specInterface] NVARCHAR(1000) NOT NULL,
[specPower] NVARCHAR(1000) NOT NULL,
[specSpeed] NVARCHAR(1000) NOT NULL,
[specType] NVARCHAR(1000) NOT NULL,
[warranty] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
