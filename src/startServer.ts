import "dotenv/config";
import debugCreator from "debug";
import app from "./server/app.js";

const debug = debugCreator("spots:server");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(`Listening to on http://localhost:${port}/`);
  });
};

export default startServer;
