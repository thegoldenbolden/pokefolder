import {
  createSession,
  deleteExpiredSessions,
  deleteSession,
  deleteUserSessions,
  getSessionAndUser,
  getUserSessions,
  updateSessionExpiration,
} from "@/db/user";
import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";

export const lucia = new Lucia(
  {
    deleteExpiredSessions,
    deleteSession,
    deleteUserSessions,
    getSessionAndUser,
    getUserSessions,
    setSession: createSession,
    updateSessionExpiration,
  },
  {
    sessionExpiresIn: new TimeSpan(1, "w"),
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes(data) {
      return {
        id: data.id,
        nickname: data.nickname,
      };
    },
  },
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  nickname: string | null;
}

/**
 * - use for server actions or route handlers
 * */
export async function getSession() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return null;
  }

  const { user, session } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  return { user, session };
}

/**
 * - use for server components
 * */
export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return null;
  }

  const { user } = await lucia.validateSession(sessionId);
  return user;
});

/**
 * - use for server components
 * */
export const isAuthenticated = cache(async () => {
  const user = await getUser();
  return !!user;
});
