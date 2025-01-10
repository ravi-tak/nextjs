-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('folder', 'file');

-- CreateTable
CREATE TABLE "MenuNode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "NodeType" NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentId" INTEGER,
    "path" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuNode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuNode" ADD CONSTRAINT "MenuNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MenuNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
