import { providers } from "@/lib/auth/utils";
import { maxErrorMessage, minErrorMessage } from "@/schemas/utils";
import {
  maxLength,
  minLength,
  object,
  picklist,
  regex,
  string,
  toTrimmed,
  type Output,
} from "valibot";

export const fields = {
  nickname: {
    max: 32,
    min: 1,
    name: "nickname",
    label: "nickname",
    regex: /^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._ ]{0,30}[a-zA-Z0-9]$/,
  },
} as const;

export const CreateUserSchema = object({
  id: string(),
  email: string(),
  nickname: string([
    toTrimmed(),
    minLength(fields.nickname.min, minErrorMessage(fields.nickname.min)),
    maxLength(fields.nickname.max, maxErrorMessage(fields.nickname.max)),
    regex(
      fields.nickname.regex,
      "Nickname must contain alphanumeric characters or underscores and start/end with a letter or number",
    ),
  ]),
});

export const OAuthAccountSchema = object({
  provider: picklist(providers),
  providerUserId: string(),
});

export const UpdateUserSchema = object({
  nickname: CreateUserSchema.entries.nickname,
});

export const CreateOAuthAccountSchema = object({
  id: string(),
  username: string(),
  provider: picklist(providers),
  providerUserId: string(),
  userId: string(),
});

export const UserIdSchema = object({
  id: CreateUserSchema.entries.id,
});

export const EmailSchema = object({
  email: CreateUserSchema.entries.email,
});

export type CreateUserOutput = Output<typeof CreateUserSchema>;
export type UserIdOutput = Output<typeof UserIdSchema>;
export type EmailOutput = Output<typeof EmailSchema>;
export type OAuthAccountOutput = Output<typeof OAuthAccountSchema>;
export type UpdateUserOutput = Output<typeof UpdateUserSchema>;
export type CreateOAuthAccountOutput = Output<typeof CreateOAuthAccountSchema>;
