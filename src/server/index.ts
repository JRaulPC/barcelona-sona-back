import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { generalErrorHandler } from "./middlewares/error.js";
import corsOptions from "./routers/corsOptions.js";

export const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use("/spots");

app.use(generalErrorHandler);

export default app;
