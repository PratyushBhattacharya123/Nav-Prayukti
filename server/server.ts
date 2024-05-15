import { app } from "./app";
import http from "http";
import { initSocketServer } from "./socketServer";
require("dotenv").config();

const server = http.createServer(app);

initSocketServer(server);

// create server
server.listen(process.env.PORT, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
});
