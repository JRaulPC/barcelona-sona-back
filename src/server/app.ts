import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/Ping/PingController.js";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import corsOptions from "./corsOptions/corsOptions.js";

export const app = express();

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.disable("x-powered-by");

app.use("/", pingController);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
