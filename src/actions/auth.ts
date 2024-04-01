"use server";
import { getSession, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const result = await getSession().catch((e) => {
    console.error("Failed to get session\n\n", e);
    return null;
  });

  if (!result?.session) {
    return {
      data: null,
      error: {
        message: "Unauthenticated",
      },
    };
  }

  try {
    await lucia.invalidateSession(result.session.id);
  } catch (error) {
    console.error("Failed to delete session record\n\n", error);
  }

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/");
}

export async function deleteSessions() {
  const result = await getSession().catch((e) => {
    console.error("Failed to get session\n\n", e);
    return null;
  });

  if (!result?.user?.id) {
    return {
      data: null,
      error: {
        message: "Unauthenticated",
      },
    };
  }

  try {
    await lucia.invalidateUserSessions(result.user.id);
  } catch (error) {
    console.error("Failed to delete sessions\n\n", error);
    return {
      data: null,
      error: {
        message: "Failed to delete sessions",
      },
    };
  }

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/");
}

export async function deleteExpiredSessions() {
  await lucia.deleteExpiredSessions();
}
