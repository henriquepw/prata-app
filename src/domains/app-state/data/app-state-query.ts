import { queryOptions } from "@tanstack/react-query"
import { getAppState } from "./app-state-api"

export const appStateQueryOpt = queryOptions({
  queryKey: ["app-state"],
  queryFn: getAppState,
})
