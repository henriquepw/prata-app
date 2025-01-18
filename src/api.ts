import ky from "ky"

export const api = ky.create({
  prefixUrl: process.env.API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
})
