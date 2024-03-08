/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import "./app/mail/sendMail";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
import path from 'path'
const app: Application = express();
import config from './app/config'
// Parser
app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/product/buy-product/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(morgan("dev"));

// app.use(express.json())
app.use(
  cors({
    origin: config.base_url,
    credentials: true,
  })
);
app.use(cookieParser());

const static_folder = path.join(__dirname, "..", "public");
app.use(express.static(static_folder));
// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
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
      <h1>Welcome <br /> Digiexplo</h1>
      <p>Who do we have here? 😊😊</p>
    </div>
  </body>
  </html>`);
});

// global error handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
