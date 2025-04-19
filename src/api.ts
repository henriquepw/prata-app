import ky from "ky"

export const api = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
})
