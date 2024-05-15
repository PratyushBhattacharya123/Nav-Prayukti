"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldSensorData = exports.getAllSensorData = exports.createSensorData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSensorData = (temperature, humidity, pressure) => {
    return prisma.sensorData.create({
        data: {
            temperature,
            humidity,
            pressure,
        },
    });
};
exports.createSensorData = createSensorData;
const getAllSensorData = () => {
    return prisma.sensorData.findMany();
};
exports.getAllSensorData = getAllSensorData;
const deleteOldSensorData = async () => {
    try {
        const totalEntries = await prisma.sensorData.count();
        const entriesToKeep = 100;
        if (totalEntries > entriesToKeep) {
            const entriesToDelete = totalEntries - entriesToKeep;
            const excessEntries = await prisma.sensorData.findMany({
                take: entriesToDelete,
                orderBy: {
                    createdAt: "asc",
                },
                select: {
                    id: true,
                },
            });
            const excessEntryIds = excessEntries.map((entry) => entry.id);
            // Deleting the excess entries
            await prisma.sensorData.deleteMany({
                where: {
                    id: {
                        in: excessEntryIds,
                    },
                },
            });
            console.log(`Deleted ${entriesToDelete} excess sensor data entries.`);
        }
        else {
            console.log("No excess sensor data entries to delete.");
        }
    }
    catch (error) {
        console.error("Error deleting excess sensor data:", error);
        throw error;
    }
};
exports.deleteOldSensorData = deleteOldSensorData;
