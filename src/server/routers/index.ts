import cors from "cors";
import "dotenv/config";
import express from "express";

export const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://raul-perez-final-project-202307-bcn.netlify.app/",
    ],
  }),
);

export default app;
