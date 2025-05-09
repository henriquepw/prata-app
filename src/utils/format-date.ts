export function formatDate(date: string): string {
  return new Date(date).toLocaleString().slice(0, 10)
}

export function formatISO(date: Date): string {
  return date.toISOString()
  // return `${date.toISOString().slice(0, -5)}Z`
}
