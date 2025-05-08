import ky from "ky"
import { useEffect } from "react"
import { create } from "zustand"
import { useAuth } from "./store/auth-store"

const _api = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
})

export const useApi = create(() => _api)

export function useSetupApi() {
  const auth = useAuth()
  useEffect(() => {
    if (auth.isSignedIn) {
      useApi.setState(
        _api.extend({
          hooks: {
            beforeRequest: [
              async (request) => {
                const token = await auth.getToken()
                request.headers.set("authorization", `Bearer ${token}`)
              },
            ],
          },
        }),
      )
      return
    }

    useApi.setState(_api)
  }, [auth.isSignedIn, auth.getToken])
}
