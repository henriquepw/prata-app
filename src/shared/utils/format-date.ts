export function formatDate(date: string): string {
  return new Date(date).toLocaleString().slice(0, 10)
}

export function formatISO(date: Date): string {
  return date.toISOString()
}
