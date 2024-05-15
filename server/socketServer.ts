import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

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
