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
    "expirationAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MailRecord" ("id", "from", "to", "type", "subject", "code", "receiverId", "expirationAt", "createdAt", "updateAt", "deletedAt") SELECT "id", "from", "to", "type", "subject", "code", "receiverId", "expirationAt", "createdAt", "updateAt", "deletedAt" FROM "MailRecord";
DROP TABLE "MailRecord";
ALTER TABLE "new_MailRecord" RENAME TO "MailRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
