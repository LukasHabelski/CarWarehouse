CREATE TABLE "Clients" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100),
    "Email" VARCHAR(100),
    "Phone" VARCHAR(30)
);

CREATE TABLE "Appointments" (
    "Id" SERIAL PRIMARY KEY,
    "Date" TIMESTAMP,
    "CustomerName" VARCHAR(100),
    "ServiceType" VARCHAR(100),
    "ClientId" INT,
    "IsBooked" BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY ("ClientId") REFERENCES "Clients"("Id")
);

CREATE TABLE "Magazines" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100),
    "Location" VARCHAR(100)
);

CREATE TABLE "Products" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100),
    "MagazineId" INT,
    "Price" DECIMAL(10, 2),
    FOREIGN KEY ("MagazineId") REFERENCES "Magazines"("Id")
);

CREATE TABLE "Purchases" (
    "Id" SERIAL PRIMARY KEY,
    "Date" TIMESTAMP,
    "ProductId" INT,
    "ClientId" INT,
    FOREIGN KEY ("ProductId") REFERENCES "Products"("Id"),
    FOREIGN KEY ("ClientId") REFERENCES "Clients"("Id")
);

CREATE TABLE "Services" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100),
    "Description" TEXT,
    "Price" DECIMAL(10, 2)
);
