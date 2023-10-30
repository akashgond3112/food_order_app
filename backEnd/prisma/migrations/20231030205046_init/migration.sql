-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ownerNmae" VARCHAR(255) NOT NULL,
    "foodType" VARCHAR(255) NOT NULL,
    "pincode" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);
