import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  var db: PrismaClient;
}

const db =
  global.db ||
  new PrismaClient({
    errorFormat: "pretty",
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

if (process.env.NODE_ENV !== "production") {
  global.db = db;
}

export { db };
