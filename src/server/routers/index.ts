import "dotenv/config";
import express from "express";

export const app = express();
app.disable("x-powered-by");

export default app;
