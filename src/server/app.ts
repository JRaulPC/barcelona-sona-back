import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController/PingController.js";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import corsOptions from "./corsOptions/corsOptions.js";
import auth from "./middlewares/auth.js";

export const app = express();

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

app.disable("x-powered-by");

app.use(auth);

app.use("/", pingController);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
