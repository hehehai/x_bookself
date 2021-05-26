-- CreateTable
CREATE TABLE "MailRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "expiresIn" TEXT NOT NULL DEFAULT '5m',
    "type" INTEGER NOT NULL DEFAULT 0,
    "subject" TEXT,
    "code" TEXT,
    "receiverId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
