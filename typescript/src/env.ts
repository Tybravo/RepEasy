import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  SUI_NETWORK: z.string(),
  PACKAGE_ID: z.string(),
  HEROES_REGISTRY_ID: z.string(),
  USER_SECRET_KEY: z.string(),
});

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 2)
  );
  process.exit(1); // Exit the process to prevent runtime issues
}

export const ENV = parsedEnv.data;
