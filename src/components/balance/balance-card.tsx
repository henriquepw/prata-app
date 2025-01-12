import { Box } from "@ui/box"
import { Icon } from "@ui/icon"
import { Text } from "@ui/text"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react-native"
import { useMemo } from "react"
import { useTransationStore } from "~/store/transation-store"
import { formatAmount } from "~/utils/format-amount"

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
    <Box className="items-center">
      <Text className="text-neutral-500">Total em conta</Text>
      <Text className="mb-4 font-bold text-2xl text-neutral-800">
        {totals.current}
      </Text>
      <Box className="w-full flex-row justify-between">
        <Box className="flex-row items-center gap-1">
          <Icon as={ArrowUpIcon} className="text-green-600" />
          <Text className="text-green-600">{totals.income}</Text>
        </Box>
        <Box className="flex-row items-center gap-1">
          <Icon as={ArrowDownIcon} className="text-red-600" />
          <Text className="text-red-600">{totals.outcome}</Text>
        </Box>
      </Box>
    </Box>
  )
}
