import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import corsOptions from "./corsOptions/corsOptions.js";
import auth from "./middlewares/auth.js";
import spotsRoutes from "./routers/spotsRouter.js";
import paths from "../paths/paths.js";
import pingController from "./controllers/pingController/pingController.js";

export const app = express();

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");

app.use(paths.slash, pingController);

app.use(auth);
app.use(paths.spots, spotsRoutes);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
