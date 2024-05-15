import express from "express";
import { getAllData, postData } from "../controllers/sensorData.controller";
const sensorRouter = express.Router();

sensorRouter.post("/sensor-data", postData);

sensorRouter.get("/get-data", getAllData);

export default sensorRouter;
