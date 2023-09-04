import debugCreator from "debug";
import "dotenv/config";
import app from "../index.js";

const debug = debugCreator("spots:server");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(`Listening to on http://localhost:${port}/espacios`);
  });
};

export default startServer;
