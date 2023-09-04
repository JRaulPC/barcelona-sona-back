import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/Ping/PingController.js";
import { generalErrorHandler } from "./middlewares/error.js";
import corsOptions from "./routers/corsOptions.js";

export const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use("/", pingController);

app.use(generalErrorHandler);

export default app;
