import ky from "ky"
import { useAuth } from "~/store/auth"

export const baseApi = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
  hooks: {
    beforeRequest: [
      (r) => {
        console.log(r.url)
      },
    ],
  },
})

export const api = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
  hooks: {
    beforeRequest: [
      (r) => {
        console.log(r.url)
      },
      async (request) => {
        const auth = useAuth.getState()
        if (!auth.isSignedIn) {
          return
        }

        try {
          const token = await auth.getToken()
          request.headers.set("authorization", `Bearer ${token}`)
        } catch (err) {
          console.error(err)
        }
      },
    ],
  },
})
