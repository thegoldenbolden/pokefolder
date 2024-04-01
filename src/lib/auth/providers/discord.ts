import { getRedirectURI, type Profile } from "@/lib/auth/utils";
import { fetcher } from "@/lib/utils";
import { env } from "@/schemas/valibot/env";
import { Discord, type DiscordTokens } from "arctic";

type DiscordProfile = {
  id: string;
  username: string;
  avatar: string;
  accent_color: string;
  global_name: string;
  email: string;
  verified: boolean;
};

const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  getRedirectURI("discord"),
);

export async function getDiscordProfile(
  tokens: DiscordTokens,
): Promise<Profile> {
  const url = new URL("https://discord.com/api/users/@me");
  const profile: DiscordProfile = await fetcher(url, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  return {
    id: profile.id,
    nickname: profile.global_name,
    email: profile.email,
    username: profile.username,
  };
}

export async function createDiscordAuthorizationURL(state: string) {
  return await discord.createAuthorizationURL(state, {
    scopes: ["identify", "email"],
  });
}

export async function validateDiscordAuthorizationCode(code: string) {
  return await discord.validateAuthorizationCode(code);
}
