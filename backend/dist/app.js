"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "*",
    // credentials: true,
}));
// app.use(cookieParser());
app.use(express_1.default.static('public'));
app.use('/uploads', express_1.default.static('uploads'));
// application routes
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digiexplo Server</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .container {
        width: 1024px;
        height: 80vh;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        text-align: center;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        margin: 10px 0;
        display: flex;
        gap: 1.5rem;
      }
      a {
        text-decoration: none;
        color: #007BFF;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>korean language exam</h1>
    </div>
  </body>
  </html>`);
});
// global error handler
app.use(globalErrorHandler_1.default);
// Not Found
app.use(notFound_1.default);
exports.default = app;
