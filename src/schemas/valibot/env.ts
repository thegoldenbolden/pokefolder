import { object, optional, parse, string } from "valibot";

const EnvSchema = object({
  DISCORD_CLIENT_ID: string(),
  DISCORD_CLIENT_SECRET: string(),
  TCG_API_KEY: string(),
  DATABASE_URL: string(),
  DIRECT_URL: string(),
  NEXT_PUBLIC_SITE_URL: optional(string()),
  NEXT_PUBLIC_VERCEL_URL: optional(string()),
});

export const env = parse(EnvSchema, process.env);
