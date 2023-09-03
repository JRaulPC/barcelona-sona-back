import "dotenv/config";
import startServer from "./routers/startServer.js";

const port = process.env.PORT ?? 4000;

startServer(+port);
