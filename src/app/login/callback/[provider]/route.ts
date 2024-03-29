import { db } from "@/db/client";
import { createOAuthAccount, createUser, getUserByEmail } from "@/db/user";
import { lucia } from "@/lib/auth";
import {
  deleteCookies,
  getCallbackURL,
  getProfile,
  getStoredState,
  validateAuthorizationCode,
  type AuthRouteSegment,
} from "@/lib/auth/utils";
import { isOAuthError } from "@/lib/errors";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: AuthRouteSegment,
): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = getStoredState(params.provider);

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await validateAuthorizationCode(code, params.provider);
    const profile = await getProfile(tokens, params.provider);

    const user = await getUserByEmail({
      email: profile.email,
    });

    if (
      user &&
      user.accounts.every((account) => account.provider !== params.provider)
    ) {
      const searchParams = new URLSearchParams();
      searchParams.set("error", "AccountAlreadyExists");

      const account = user.accounts.at(0);
      if (account) {
        searchParams.set("provider", account.provider);
      }

      deleteCookies(params.provider);
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/login?${searchParams}`,
        },
      });
    }

    if (user) {
      const sessionId = generateId(18);
      const session = await lucia.createSession(user.id, {
        id: sessionId,
      });

      const cookie = lucia.createSessionCookie(session.id);
      cookies().set(cookie.name, cookie.value, cookie.attributes);
      deleteCookies(params.provider);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(18);
    const oauthAccountId = generateId(18);

    await db.$transaction([
      createUser({
        id: userId,
        nickname: profile.nickname,
        email: profile.email,
      }),
      createOAuthAccount({
        userId,
        id: oauthAccountId,
        username: profile.nickname,
        provider: params.provider,
        providerUserId: profile.id,
      }),
    ]);

    const session = await lucia.createSession(userId, {});
    const cookie = lucia.createSessionCookie(session.id);
    cookies().set(cookie.name, cookie.value, cookie.attributes);

    deleteCookies(params.provider);
    const callbackURL = getCallbackURL();
    return new Response(null, {
      status: 302,
      headers: {
        Location: callbackURL,
      },
    });
  } catch (error) {
    console.error("OAuthCallbackError\n\n", error);

    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    if (isOAuthError(error)) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/login?error=${error.name}`,
        },
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: `/login?error=OAuthCallbackError`,
      },
    });
  }
}
