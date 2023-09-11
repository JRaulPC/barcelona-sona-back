import { type CorsOptions } from "cors";
import "dotenv/config";

const localOriginUrl = process.env.CORS_ORIGIN_LOCAL!;
const prodOriginUrl = process.env.CORS_ORIGIN_PROD!;

const corsOptions: CorsOptions = {
  origin: [localOriginUrl, prodOriginUrl],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
  credentials: true,
};

export default corsOptions;
