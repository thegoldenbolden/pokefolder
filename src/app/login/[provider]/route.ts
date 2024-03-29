import {
  createAuthorizationURL,
  setCallbackURL,
  setOAuthStateCookie,
  type AuthRouteSegment,
} from "@/lib/auth/utils";
import { isOAuthError } from "@/lib/errors";
import { generateState } from "arctic";

export async function GET(
  request: Request,
  { params }: AuthRouteSegment,
): Promise<Response> {
  const state = generateState();

  try {
    const url = await createAuthorizationURL(state, params.provider);
    setOAuthStateCookie(state, params.provider);

    const searchParams = new URLSearchParams(request.url);
    const callbackURL = searchParams.get("callback_url");
    setCallbackURL(callbackURL);

    return Response.redirect(url);
  } catch (error) {
    console.error("Failed to create authorization url\n\n", error);
    const searchParams = new URLSearchParams();
    searchParams.set("error", "OAuthError");

    if (isOAuthError(error)) {
      searchParams.set("error", error.name);
    }

    return Response.redirect(`/login?${error}`);
  }
}
