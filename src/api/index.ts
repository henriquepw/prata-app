import { isBefore } from "date-fns"
import { useAuth } from "~/store/slices/auth"
import { publicApi } from "./public"

export const api = publicApi.extend({
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

        if (isBefore(new Date(), auth.data.refreshExpiresAt)) {
          return new Response(null, { status: 401 })
        }

        try {
          const token = await auth.getToken()
          request.headers.set("authorization", `Bearer ${token}`)
        } catch {
          return new Response(null, { status: 401 })
        }
      },
    ],
    afterResponse: [
      (_, __, response) => {
        if (response.status === 401) {
          useAuth.getState().logout()
        }
      },
    ],
  },
})
