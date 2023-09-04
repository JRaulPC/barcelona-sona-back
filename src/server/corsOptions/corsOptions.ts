import "dotenv/config";

const localOriginUrl = process.env.CORS_ORIGIN_LOCAL!;
const prodOriginUrl = process.env.CORS_ORIGIN_PROD!;

const corsOptions = {
  origin: [localOriginUrl, prodOriginUrl],
};

export default corsOptions;
