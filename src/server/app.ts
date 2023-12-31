import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import corsOptions from "./corsOptions/corsOptions.js";
import paths from "../paths/paths.js";
import pingController from "./controllers/pingController/pingController.js";
import spotsRouter from "./routers/spotsRouter.js";
import auth from "./middlewares/auth.js";
import { registerUserController } from "./controllers/spotsControllers/userControllers.js";

export const app = express();

app.use(cors(corsOptions));

app.use(express.json(), express.text());

app.use(morgan("dev"));

app.disable("x-powered-by");

app.get(paths.root, pingController);
app.post(paths.signUp, registerUserController);

app.use(paths.spots, auth, spotsRouter);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
