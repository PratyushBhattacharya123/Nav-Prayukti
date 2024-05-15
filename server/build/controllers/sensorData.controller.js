"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllData = exports.postData = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const sensorData_service_1 = require("../service/sensorData.service");
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
// post sensor data
exports.postData = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { temperature, humidity, pressure } = req.body;
    try {
        const newSensorData = await (0, sensorData_service_1.createSensorData)(temperature, humidity, pressure);
        res.status(201).json(newSensorData);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get all data
exports.getAllData = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const sensorData = await (0, sensorData_service_1.getAllSensorData)();
        res.status(200).json(sensorData);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// cron scheduling every 30 minutes
node_cron_1.default.schedule("*/30 * * * *", async () => {
    try {
        await (0, sensorData_service_1.deleteOldSensorData)();
        console.log("Old sensor data deleted successfully.");
    }
    catch (error) {
        console.error("Error deleting old sensor data:", error);
    }
});
