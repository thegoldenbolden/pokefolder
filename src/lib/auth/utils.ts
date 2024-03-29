import {
  createDiscordAuthorizationURL,
  getDiscordProfile,
  validateDiscordAuthorizationCode,
} from "@/lib/auth/providers/discord";
import { OAuthError } from "@/lib/errors";
import { getURL } from "@/lib/utils";
import type { DiscordTokens } from "arctic";
import { cookies } from "next/headers";
import "server-only";

export type Provider = "discord";
type Tokens = DiscordTokens;

export const providers: Provider[] = ["discord"];

export type Profile = {
  id: string;
  email: string;
  nickname: string;
  username: string;
};

export type AuthRouteSegment = {
  params: {
    provider: Provider;
  };
};

function getOAuthStateKey(provider: Provider) {
  return `${provider}_oauth_state`;
}

function getCodeVerifierKey(provider: Provider) {
  return `${provider}_code_verifier`;
}

export function deleteCookies(provider: Provider) {
  cookies().delete(`${provider}_oauth_state`);
  cookies().delete(`${provider}_code_verifier`);
  cookies().delete(`callback_url`);
}

export function setCallbackURL(pathname: string | null) {
  const url = pathname?.startsWith("/") ? pathname : "/";

  cookies().set({
    name: `callback_url`,
    value: url,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "strict",
  });
}

/**
 * Store code_verifier for oauth2 with pkce providers
 */
export function setCodeVerifierCookie(
  codeVerifier: string,
  provider: Provider,
) {
  cookies().set({
    name: `${provider}_code_verifier`,
    value: codeVerifier,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
}

/**
 * Stores state for authorization
 */
export function setOAuthStateCookie(state: string, provider: Provider) {
  cookies().set({
    name: `${provider}_oauth_state`,
    value: state,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
}

export function getCallbackURL() {
  const url = cookies().get("callback_url")?.value || "/";
  return url;
}

export function getStoredState(provider: Provider) {
  const cookieName = getOAuthStateKey(provider);
  return cookies().get(cookieName)?.value ?? null;
}

export function getStoredCodeVerifier(provider: Provider) {
  const storedCodeVerifier =
    cookies().get(getCodeVerifierKey(provider))?.value ?? null;

  if (!storedCodeVerifier) {
    throw new OAuthError("OAuthCallbackError", {
      provider,
      message: "Missing OAuth 'code_verifier' cookie",
    });
  }

  return storedCodeVerifier;
}

export async function validateAuthorizationCode(code: string, p: Provider) {
  switch (p) {
    default:
      throw new OAuthError("InvalidOAuthProvider");
    case "discord":
      return await validateDiscordAuthorizationCode(code);
  }
}

export async function createAuthorizationURL(state: string, p: Provider) {
  switch (p) {
    default:
      throw new OAuthError("InvalidOAuthProvider");
    case "discord":
      return await createDiscordAuthorizationURL(state);
  }
}

export async function getProfile(tokens: Tokens | unknown, provider: Provider) {
  if (!tokens) {
    throw new OAuthError("OAuthProfileError", {
      provider,
      message: "Missing oauth tokens",
    });
  }

  switch (provider) {
    default:
      throw new OAuthError("InvalidOAuthProvider");
    case "discord":
      return await getDiscordProfile(tokens as DiscordTokens);
  }
}

export function getRedirectURI(provider: Provider) {
  return getURL(`/login/callback/${provider}`);
}
