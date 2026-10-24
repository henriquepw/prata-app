import { parseISO } from "date-fns"

export function parseDate(str?: string | null): Date | undefined {
  if (!str) {
    return undefined
  }

  return parseISO(str)
}
