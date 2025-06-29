import { Box } from "~/shared/components/box"
import { Text } from "~/shared/components/text"
import { formatAmount } from "~/shared/utils/format-amount"
import { formatDate } from "~/shared/utils/format-date"
import { type Transaction, TransactionType } from "../store/types"

type Props = {
  transaction: Transaction
}
export function TransationCard({ transaction }: Props) {
  const amount = formatAmount(transaction.amount)
  const dueAt = formatDate(transaction.receivedAt)
  const isIncome = transaction.type === TransactionType.INCOME

  return (
    <Box className="flex-1">
      <Text className="text-typography-500">{dueAt}</Text>
      <Box className="flex-row justify-between gap-2">
        <Text numberOfLines={1} size="lg">
          {transaction.description}
        </Text>
        <Text
          bold
          className={isIncome ? "text-success-600" : "text-error-600"}
          size="lg"
        >
          {isIncome ? "" : "-"}
          {amount}
        </Text>
      </Box>
    </Box>
  )
}
