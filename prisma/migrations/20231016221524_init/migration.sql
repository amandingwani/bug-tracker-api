-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "google_id_sub" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "picture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_sub_key" ON "User"("google_id_sub");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
