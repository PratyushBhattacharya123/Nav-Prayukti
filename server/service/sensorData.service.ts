import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSensorData = (
  temperature: number,
  humidity: number,
  pressure: number
) => {
  return prisma.sensorData.create({
    data: {
      temperature,
      humidity,
      pressure,
    },
  });
};

export const getAllSensorData = () => {
  return prisma.sensorData.findMany();
};

export const deleteOldSensorData = async (): Promise<void> => {
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
    } else {
      console.log("No excess sensor data entries to delete.");
    }
  } catch (error) {
    console.error("Error deleting excess sensor data:", error);
    throw error;
  }
};
