export const env = {
  tursor: {
    url: process.env.TURSO_SYNC_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
  },
} as const
