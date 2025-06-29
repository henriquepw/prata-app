import { ArrowDownIcon, ArrowUpIcon } from "lucide-react-native"
import { useMemo } from "react"
import { useMontlyTransactions } from "~/features/transaction/store/montly-transactions"
import { Box } from "~/shared/components/box"
import { Icon } from "~/shared/components/icon"
import { SkeletonText } from "~/shared/components/skeleton"
import { Text } from "~/shared/components/text"
import { formatAmount } from "~/shared/utils/format-amount"
import { formatMonth } from "~/shared/utils/format-date"

export function BalanceViewFallback() {
  return (
    <Box className="my-6 items-center gap-4">
      <SkeletonText className="h-8 w-1/2 rounded" />
      <Box className="w-full flex-row justify-between gap-4">
        <SkeletonText className="h-6 w-1/5 rounded" />
        <SkeletonText className="h-6 w-1/5 rounded" />
      </Box>
    </Box>
  )
}

export function BalanceView() {
  const transations = useMontlyTransactions()

  const totals = useMemo(() => {
    let income = 0
    let outcome = 0
    for (const t of transations.data || []) {
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
    <Box className="my-6 items-center">
      <Text className="mb-0.5 w-full text-center text-typography-600 capitalize">
        {formatMonth(new Date())}
      </Text>
      <Text className="font-bold text-4xl text-primary-500">
        {totals.current}
      </Text>
      <Box className="w-full flex-row justify-between">
        <Box className="flex-row items-center gap-1">
          <Icon as={ArrowUpIcon} className="text-green-500" />
          <Text className="text-green-500">{totals.income}</Text>
        </Box>
        <Box className="flex-row items-center gap-1">
          <Icon as={ArrowDownIcon} className="text-red-500" />
          <Text className="text-red-500">{totals.outcome}</Text>
        </Box>
      </Box>
    </Box>
  )
}
