-- CreateTable
CREATE TABLE "Students" (
    "name" TEXT NOT NULL,
    "cohort" TEXT NOT NULL,
    "courses" JSONB NOT NULL,
    "dateJoined" DATE NOT NULL,
    "lastLogin" DATE NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("name")
);
