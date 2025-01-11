import { useMemo } from "react"
import { Text, View } from "react-native"
import { useTransationStore } from "~/store/transation-store"
import { formatAmount } from "~/utils/format-amount"
import { IncomeIcon, OutcomeIcon } from "../ui/icons"

export function BalanceCard() {
  const transations = useTransationStore((s) => s.transations)

  const totals = useMemo(() => {
    let income = 0
    let outcome = 0
    for (const t of transations) {
      if (t.type === "INCOME") {
        income += t.amount
      } else {
        outcome += t.amount
      }
    }

    const current = income - outcome
    return {
      current: formatAmount(current),
      income: formatAmount(income),
      outcome: formatAmount(outcome),
    }
  }, [transations])

  return (
    <View className="items-center">
      <Text className="mb-1 text-neutral-dim">Total em conta</Text>
      <Text className="mb-4 font-bold text-2xl text-neutral-normal">
        {totals.current}
      </Text>
      <View className="w-full flex-row justify-between">
        <View className="flex-row items-center gap-1">
          <IncomeIcon className="text-green-dim text-lg" />
          <Text className="text-green-dim">{totals.income}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <OutcomeIcon className="text-lg text-red-dim" />
          <Text className="text-red-dim">{totals.outcome}</Text>
        </View>
      </View>
    </View>
  )
}
