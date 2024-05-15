"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sensorData_controller_1 = require("../controllers/sensorData.controller");
const sensorRouter = express_1.default.Router();
sensorRouter.post("/sensor-data", sensorData_controller_1.postData);
sensorRouter.get("/get-data", sensorData_controller_1.getAllData);
exports.default = sensorRouter;
