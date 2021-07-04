import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables.");
  dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGODB_URI = process.env["MONGODB_URI"];
export const KEYS = process.env.SECRET_OR_KEY;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const ROOT_AWS_S3 = process.env.ROOT_AWS_S3;
