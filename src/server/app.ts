import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import corsOptions from "./corsOptions/corsOptions.js";
import paths from "../paths/paths.js";
import pingController from "./controllers/pingController/pingController.js";
import spotsRouter from "./routers/spotsRouter.js";

export const app = express();

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use(paths.spots, spotsRouter);

app.get(paths.slash, pingController);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
