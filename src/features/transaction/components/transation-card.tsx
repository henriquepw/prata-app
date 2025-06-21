import { ArrowDownIcon, ArrowUpIcon } from "lucide-react-native"
import { TouchableOpacity } from "react-native"
import {
  type Transaction,
  TransactionType,
} from "~/features/transaction/store/transation"
import { Box } from "~/shared/components/box"
import { Icon } from "~/shared/components/icon"
import { Text } from "~/shared/components/text"
import { cn } from "~/shared/utils/cn"
import { formatAmount } from "~/shared/utils/format-amount"
import { formatDate } from "~/shared/utils/format-date"

type Props = {
  transaction: Transaction
}
export function TransationCard({ transaction }: Props) {
  const amount = formatAmount(transaction.amount)
  const dueAt = formatDate(transaction.receivedAt)
  const isIncome = transaction.type === TransactionType.INCOME

  return (
    <TouchableOpacity>
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
            as={isIncome ? ArrowUpIcon : ArrowDownIcon}
            className={isIncome ? "text-success-600" : "text-error-600"}
          />
        </Box>
        <Box>
          <Text className="text-typography-500">{dueAt}</Text>
          <Text
            bold
            className={isIncome ? "text-success-600" : "text-error-600"}
            size="xl"
          >
            {amount}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
