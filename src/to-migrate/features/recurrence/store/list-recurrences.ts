import { useQuery } from "@tanstack/react-query"
import { queryKeys, type Recurrence, type RecurrenceParams } from "./types"

export const useRecurrencesParams = (): RecurrenceParams => ({})

export const useSetRecurrencesParams = () => (_params: RecurrenceParams) => {}

export function useReccurences() {
  const params = useRecurrencesParams()

  const query = useQuery({
    queryKey: queryKeys.list(params),
    queryFn: async (): Promise<Recurrence[]> => [],
  })

  return [query.data, query] as const
}
