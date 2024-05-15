"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./middleware/error");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sensorData_routes_1 = __importDefault(require("./routes/sensorData.routes"));
require("dotenv").config();
exports.app = (0, express_1.default)();
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// enable CORS(cross origin resource sharing)
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
// routes
exports.app.use("/api/v1", sensorData_routes_1.default);
// testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});
// unknown routes
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Middleware calls
exports.app.use(error_1.ErrorMiddleware);
