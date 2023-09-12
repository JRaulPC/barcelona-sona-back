import "dotenv/config";
import { type CorsOptions } from "cors";

const localOriginUrl = process.env.CORS_ORIGIN_LOCAL!;
const prodOriginUrl = process.env.CORS_ORIGIN_PROD!;

const corsOptions: CorsOptions = {
  origin: [prodOriginUrl, localOriginUrl],
};

export default corsOptions;
