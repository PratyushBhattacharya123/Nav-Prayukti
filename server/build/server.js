"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http_1 = __importDefault(require("http"));
const socketServer_1 = require("./socketServer");
require("dotenv").config();
const server = http_1.default.createServer(app_1.app);
(0, socketServer_1.initSocketServer)(server);
// create server
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
});
