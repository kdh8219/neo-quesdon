-- CreateTable
CREATE TABLE "ForeignServerUserKey" (
    "id" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "serverID" INTEGER NOT NULL,
    "userKey" TEXT NOT NULL,

    CONSTRAINT "ForeignServerUserKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ForeignServerUserKey_userID_serverID_idx" ON "ForeignServerUserKey"("userID", "serverID");

-- CreateIndex
CREATE UNIQUE INDEX "ForeignServerUserKey_userID_serverID_key" ON "ForeignServerUserKey"("userID", "serverID");

-- AddForeignKey
ALTER TABLE "ForeignServerUserKey" ADD CONSTRAINT "ForeignServerUserKey_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForeignServerUserKey" ADD CONSTRAINT "ForeignServerUserKey_serverID_fkey" FOREIGN KEY ("serverID") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
