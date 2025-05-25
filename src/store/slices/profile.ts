import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { useUserId } from "./auth"

const keys = {
  profile: (id: string) => ["profile", id],
} as const

type Profile = {
  id: string
  email: string
  username: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export function useProfile() {
  const userId = useUserId()

  return useQuery({
    enabled: !!userId,
    queryKey: keys.profile(userId || ""),
    queryFn: async ({ signal }) => {
      return api.get<Profile>("me/profile", { signal }).json()
    },
  })
}
