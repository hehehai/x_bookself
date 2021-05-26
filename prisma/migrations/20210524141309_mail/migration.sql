/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `MailRecord` table. All the data in the column will be lost.
  - Added the required column `expirationAt` to the `MailRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MailRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "subject" TEXT,
    "code" TEXT,
    "receiverId" INTEGER NOT NULL,
    "expirationAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MailRecord" ("id", "from", "to", "type", "subject", "code", "receiverId", "createdAt", "updateAt", "deletedAt") SELECT "id", "from", "to", "type", "subject", "code", "receiverId", "createdAt", "updateAt", "deletedAt" FROM "MailRecord";
DROP TABLE "MailRecord";
ALTER TABLE "new_MailRecord" RENAME TO "MailRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
