import "dotenv/config";
import debugCreator from "debug";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./startServer.js";

const debug = debugCreator("spots:server");

const port = process.env.PORT ?? 4000;
const mongoSpotsUrl = process.env.MONGODB_URL;

try {
  await connectToDatabase(mongoSpotsUrl!);
  startServer(+port);
} catch (error: unknown) {
  debug("Unable to connect to database");
  debug((error as Error).message);
  process.exit(1);
}
