import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import corsOptions from "./corsOptions.js";

export const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.disable("x-powered-by");

export default app;
