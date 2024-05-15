import cron from "node-cron";
import { NextFunction, Request, Response } from "express";
import {
  createSensorData,
  deleteOldSensorData,
  getAllSensorData,
} from "../service/sensorData.service";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

// post sensor data
export const postData = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { temperature, humidity, pressure } = req.body;
    try {
      const newSensorData = await createSensorData(
        temperature,
        humidity,
        pressure
      );
      res.status(201).json(newSensorData);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get all data
export const getAllData = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensorData = await getAllSensorData();
      res.status(200).json(sensorData);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// cron scheduling every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  try {
    await deleteOldSensorData();
    console.log("Old sensor data deleted successfully.");
  } catch (error) {
    console.error("Error deleting old sensor data:", error);
  }
});
