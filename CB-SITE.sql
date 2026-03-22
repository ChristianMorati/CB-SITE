-- create type product_type as ENUM('other', 'motorcycle', 'electric-bike', 'bike');

create table "product" (
  "id" UUID primary key default gen_random_uuid (),
  "name" VARCHAR(255) not null,
  "description" VARCHAR(255) null,
  type product_type not null,
  "imgUrl" VARCHAR(255) not null
);

CREATE TYPE unlock_Type AS ENUM (
  'none',
  'NFC',
  'KEY',
  'BUTTON'
);

CREATE TABLE "unlockType"(
    "id" UUID primary key default gen_random_uuid (),
    type unlock_Type NOT NULL
);

CREATE TABLE "seatColor"(
    "id" UUID primary key default gen_random_uuid (),
    "name" VARCHAR(255) NOT NULL,
    "RGB" VARCHAR(255) NOT NULL
);

CREATE TABLE "paymentCondition"(
    "id" UUID primary key default gen_random_uuid (),
    "type" VARCHAR(255) NOT NULL,
    "numberOfInstallments" SMALLINT NOT NULL DEFAULT 0,
    "value" INTEGER NOT NULL DEFAULT 0,
    "installmentsValue" SMALLINT NOT NULL DEFAULT 0,
    "descountPercent" SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE "productAttribute"(
    "id" UUID primary key default gen_random_uuid (),
    "productId" UUID NOT NULL,
    "attributeId" UUID NOT NULL
);

CREATE TABLE "attribute"(
    "id" UUID primary key default gen_random_uuid (),
    "name" BIGINT NOT NULL,
    "value" BIGINT NOT NULL
);
    
CREATE TABLE "productColor"(
    "id" UUID primary key default gen_random_uuid (),
    "name" BIGINT NOT NULL,
    "RGB" BIGINT NOT NULL
);

ALTER TABLE
    "unlockType" ADD CONSTRAINT "unlocktype_id_foreign" FOREIGN KEY("id") REFERENCES "product"("id");
ALTER TABLE
    "productAttribute" ADD CONSTRAINT "product_attribute_productid_foreign" FOREIGN KEY("productId") REFERENCES "product"("id");
ALTER TABLE
    "seatColor" ADD CONSTRAINT "seatcolor_id_foreign" FOREIGN KEY("id") REFERENCES "product"("id");
ALTER TABLE
    "productColor" ADD CONSTRAINT "productcolor_id_foreign" FOREIGN KEY("id") REFERENCES "product"("id");
ALTER TABLE
    "paymentCondition" ADD CONSTRAINT "paymentcondition_id_foreign" FOREIGN KEY("id") REFERENCES "product"("id");
ALTER TABLE
    "productAttribute" ADD CONSTRAINT "product_attribute_attributeid_foreign" FOREIGN KEY("attributeId") REFERENCES "attribute"("id");