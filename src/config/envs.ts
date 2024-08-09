import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asInt(),
  JWT_SECRET_KEY: get("JWT_SECRET_KEY").required().asString(),
  NODE_ENV: get("NODE_ENV").required().asString(),
  CLOUDINARY_NAME: get("CLOUDINARY_NAME").required().asString(),
  API_KEY: get("API_KEY").required().asString(),
  API_SECRET: get("API_SECRET").required().asString(),
};
