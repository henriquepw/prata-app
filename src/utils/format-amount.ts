export function formatAmount(value: number, currency = true): string {
  const amount = Number(value / 100).toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  })

  if (!currency) {
    return amount.slice(3)
  }

  return amount
}
