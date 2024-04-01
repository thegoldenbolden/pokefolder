import { db } from "@/db/client";
import {
  CreateOAuthAccountSchema,
  CreateUserSchema,
  EmailSchema,
  OAuthAccountSchema,
  UpdateUserOutput,
  UserIdSchema,
  type CreateOAuthAccountOutput,
  type CreateUserOutput,
  type EmailOutput,
  type OAuthAccountOutput,
  type UserIdOutput,
} from "@/schemas/valibot/user";
import type {
  DatabaseSession,
  DatabaseUser,
  RegisteredDatabaseUserAttributes,
} from "lucia";
import { parse } from "valibot";

export function createOAuthAccount(data: CreateOAuthAccountOutput) {
  const schema = parse(CreateOAuthAccountSchema, data);

  return db.account.create({
    data: {
      id: schema.id,
      username: schema.username,
      provider: schema.provider,
      providerUserId: schema.providerUserId,
      userId: schema.userId,
    },
  });
}

export async function createSession(session: DatabaseSession) {
  await db.session.create({
    data: {
      ...session.attributes,
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt,
    },
  });
}

export function createUser(data: CreateUserOutput) {
  const schema = parse(CreateUserSchema, data);
  return db.user.create({
    data: {
      ...schema,
    },
  });
}

export async function deleteExpiredSessions() {
  await db.session.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
}

export async function deleteSession(id: string) {
  try {
    await db.session.delete({
      where: {
        id,
      },
    });
  } catch {}
}

export async function deleteUserSessions(userId: string) {
  await db.session.deleteMany({
    where: { userId },
  });
}

export async function deleteUser(id: string) {
  const user = await db.user.delete({
    where: { id },
    select: { nickname: true },
  });

  return {
    data: {
      user,
    },
  };
}

export async function getEmail(id: string) {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      email: true,
    },
  });
  return {
    data: {
      user,
    },
  };
}

export async function getSessionAndUser(
  sessionId: string,
): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
  const data = await db.session.findUnique({
    where: { id: sessionId },
    include: {
      user: true,
    },
  });

  if (!data) {
    return [null, null];
  }

  const { user, ...session } = data;

  const {
    id: session_id,
    userId: session_user_id,
    expiresAt,
    ...session_attributes
  } = session;

  return [
    {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt,
      attributes: session_attributes,
    },
    {
      id: user.id,
      attributes: user,
    },
  ];
}

export async function getUserByEmail(data: EmailOutput) {
  const schema = parse(EmailSchema, data);

  const user = await db.user.findUnique({
    where: { email: schema.email },
    select: {
      id: true,
      nickname: true,
      accounts: {
        select: {
          provider: true,
          providerUserId: true,
        },
      },
    },
  });

  return user;
}

export async function getUserByOAuthAccount(data: OAuthAccountOutput) {
  const schema = parse(OAuthAccountSchema, data);

  const account = await db.account.findUnique({
    where: {
      provider_providerUserId: {
        provider: schema.provider,
        providerUserId: schema.providerUserId,
      },
    },
    select: {
      provider: true,
      user: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
    },
  });

  return account || null;
}

export async function getUserSessions(
  userId: string,
): Promise<DatabaseSession[]> {
  const sessions = await db.session.findMany({
    where: {
      userId,
    },
  });

  return sessions.map(({ id, userId, expiresAt, ...attributes }) => {
    return {
      id,
      userId,
      expiresAt,
      attributes,
    };
  });
}

export async function getUser(data: UserIdOutput) {
  const schema = parse(UserIdSchema, data);

  const user = await db.user.findUnique({
    where: { id: schema.id },
    select: {
      id: true,
      nickname: true,
    },
  });

  return user;
}

export async function updateSessionExpiration(
  sessionId: string,
  expiresAt: Date,
) {
  await db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      expiresAt,
    },
  });
}

export async function updateUser(
  user: RegisteredDatabaseUserAttributes,
  data: UpdateUserOutput,
) {
  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      nickname: data.nickname,
    },
  });

  return {
    data: {
      user: updated,
    },
  };
}
