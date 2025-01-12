import { Box } from "@ui/box"
import { Icon } from "@ui/icon"
import { Text } from "@ui/text"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react-native"
import { TouchableOpacity } from "react-native"
import { Transation, useTransationStore } from "~/store/transation-store"
import { cn } from "~/utils/cn"
import { formatAmount } from "~/utils/format-amount"
import { formatDate } from "~/utils/format-date"

type Props = {
  transation: Transation
}
export function TransationCard({ transation }: Props) {
  const selectTransation = useTransationStore((s) => s.selectTransation)

  const amount = formatAmount(transation.amount)
  const dueAt = formatDate(transation.dueAt)
  const isIncome = transation.type === "INCOME"

  return (
    <TouchableOpacity onPress={() => selectTransation(transation)}>
      <Box className="flex-row items-center gap-2">
        <Box
          className={cn(
            "size-12 items-center justify-center rounded-lg border p-0",
            isIncome
              ? "border-green-300/90 bg-green-300/50"
              : "border-red-300 bg-red-300/50",
          )}
        >
          <Icon
            className={isIncome ? "text-green-600" : "text-red-600"}
            as={isIncome ? ArrowUpIcon : ArrowDownIcon}
          />
        </Box>
        <Box>
          <Text className="text-typography-500">{dueAt}</Text>
          <Text
            bold
            size="xl"
            className={isIncome ? "text-green-600" : "text-red-600"}
          >
            {amount}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
