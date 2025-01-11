export function formatDate(date: string): string {
  return new Date(date).toLocaleString().slice(0, 10)
}
