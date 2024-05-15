"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const initSocketServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("A user connected");
        // Handling events from the client, such as receiving sensor data
        socket.on("sensorData", (data) => {
            console.log("Received sensor data:", data);
            // Emit data to all connected clients
            io.emit("newSensorData", data);
        });
        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("A client has disconnected.");
        });
    });
};
exports.initSocketServer = initSocketServer;
