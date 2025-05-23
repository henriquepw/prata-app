import { isBefore } from "date-fns"
import { useAuth } from "~/store/slices/auth"
import { publicApi } from "./public"

export const api = publicApi.extend({
  hooks: {
    beforeRequest: [
      async (r) => {
        console.info("REQUEST: ", r.method, " ", r.url)
        try {
          console.info("BODY: ", await r.clone().json())
        } catch {
          console.info("BODY: - ")
        }
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
      async (_, __, response) => {
        console.info({
          url: response.url,
          status: response.status,
          body: await response.clone().json(),
        })
        if (response.status === 401) {
          useAuth.getState().logout()
        }
      },
    ],
  },
})
