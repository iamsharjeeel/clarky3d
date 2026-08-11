import { z } from "zod";
import { siteSettings } from "../../content/site";

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE: z.string().min(1).optional(),
});

export type PublicEnv = z.infer<typeof publicSchema>;

export function getPublicEnv(): PublicEnv {
  return publicSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE: process.env.NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE || undefined,
  });
}

export function getSiteUrl(): string {
  const serverUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (serverUrl) {
    return serverUrl.replace(/\/$/, "");
  }
  return getPublicEnv().NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
}

export function getTelegramOrderHandle(): string {
  return getPublicEnv().NEXT_PUBLIC_TELEGRAM_ORDER_HANDLE || siteSettings.telegramHandleObserved;
}

export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

export function shouldNoIndex(): boolean {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return true;
  }
  return false;
}
