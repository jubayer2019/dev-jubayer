import { createAuthClient } from "better-auth/react";

function getAppOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: `${getAppOrigin()}/api/auth`,
});

export const { signIn, signUp, signOut, useSession } = authClient;
