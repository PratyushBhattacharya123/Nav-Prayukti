-- CreateTable
CREATE TABLE "sensorMockData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temperature" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "pressure" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
