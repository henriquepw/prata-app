import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

export function formatMonth(date: Date | string): string {
  const dt = typeof date === "string" ? new Date(date) : date
  return format(dt, "MMMM", { locale: ptBR })
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleString().slice(0, 10)
}

export function formatISO(date: Date): string {
  return date.toISOString()
}
