import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { users } from "../../drizzle/schema";
import { sdk } from "./sdk";

type User = typeof users.$inferSelect;

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  console.log("[Context] Creating context. NODE_ENV:", process.env.NODE_ENV);
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  // Auto-login as admin in development if no user is found
  if (!user && process.env.NODE_ENV === "development") {
    user = {
      id: 1,
      openId: "RKQSCfoVQPWWPKefqa9C7s",
      name: "Majid Khan",
      email: "mohmandkhan@gmail.com",
      loginMethod: "google",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastSignedIn: new Date().toISOString(),
    };
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
