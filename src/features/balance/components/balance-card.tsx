import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeClosedIcon,
  EyeIcon,
} from "lucide-react-native"
import { useMemo, useState } from "react"
import { Pressable } from "react-native"
import { useTransactions } from "~/features/transaction/store/transation"
import { Box } from "~/shared/components/box"
import { Icon } from "~/shared/components/icon"
import { Text } from "~/shared/components/text"
import { formatAmount } from "~/shared/utils/format-amount"

export function BalanceCard() {
  const transations = useTransactions()
  const [visible, setVisibility] = useState(true)

  const totals = useMemo(() => {
    if (!visible) {
      return {
        current: "******",
        income: "******",
        outcome: "******",
      }
    }

    let income = 0
    let outcome = 0
    for (const t of transations.data?.items || []) {
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
  }, [visible, transations])

  return (
    <Box className="items-center">
      <Text className="text-typography-600">Total em conta</Text>
      <Box className="mb-4 flex-row items-center gap-2">
        <Text className="font-bold text-4xl text-primary-500">
          {totals.current}
        </Text>
        <Pressable
          className="p-2 active:opacity-50"
          onPress={() => setVisibility((v) => !v)}
        >
          <Icon
            as={visible ? EyeIcon : EyeClosedIcon}
            className="text-typography-600"
            size="xl"
          />
        </Pressable>
      </Box>
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
