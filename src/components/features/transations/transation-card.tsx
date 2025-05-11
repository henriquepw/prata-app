import { ArrowDownIcon, ArrowUpIcon } from "lucide-react-native"
import { TouchableOpacity } from "react-native"
import { Box } from "~/components/ui/box"
import { Icon } from "~/components/ui/icon"
import { Text } from "~/components/ui/text"
import { Transation, useTransationStore } from "~/store/slices/transation"
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
              ? "border-success-300 bg-success-200/70"
              : "border-error-300 bg-error-200/70",
          )}
        >
          <Icon
            className={isIncome ? "text-success-600" : "text-error-600"}
            as={isIncome ? ArrowUpIcon : ArrowDownIcon}
          />
        </Box>
        <Box>
          <Text className="text-typography-500">{dueAt}</Text>
          <Text
            bold
            size="xl"
            className={isIncome ? "text-success-600" : "text-error-600"}
          >
            {amount}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
