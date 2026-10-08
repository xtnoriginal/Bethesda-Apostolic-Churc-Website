-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN "videoUrl" TEXT;

-- CreateTable
CREATE TABLE "Sermon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "preacher" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "duration" TEXT,
    "description" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
