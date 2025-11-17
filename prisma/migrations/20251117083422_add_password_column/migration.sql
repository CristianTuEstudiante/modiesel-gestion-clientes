/*
  Adjust migration to handle existing rows by adding a temporary default
  for the new required column `password`, then drop the default.
*/
-- AlterTable
ALTER TABLE "clientes"
  ADD COLUMN "password" TEXT NOT NULL DEFAULT 'changeme',
  ALTER COLUMN "nombre" DROP DEFAULT;

-- Optional: drop default so future inserts must provide password
ALTER TABLE "clientes" ALTER COLUMN "password" DROP DEFAULT;
