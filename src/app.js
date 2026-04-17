import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";

import { limiter } from "./middleware/rateLimit.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

//  Security Middlewares
app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));
app.use(hpp());

//  Logging
app.use(morgan("dev"));

//  Rate Limiting
app.use("/api", limiter);

//  Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Health Check
app.get("/check", (req, res) => {
  res.send("API is running...");
});

//  API Versioning
app.use("/api/v1", (req, res) => {
  res.json({ message: "API v1 working" });
});

//  Global Error Handler
app.use(errorHandler);

export default app;