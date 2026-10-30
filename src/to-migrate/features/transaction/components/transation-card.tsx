import { Box } from "~/components/box"
import { Text } from "~/components/text"
import { formatAmount } from "~/lib/format-amount"
import { formatDate } from "~/lib/format-date"
import { type Transaction, TransactionType } from "../store/types"

type Props = {
  transaction: Transaction
}
export function TransationCard({ transaction }: Props) {
  const amount = formatAmount(transaction.amount)
  const dueAt = formatDate(transaction.occurredAt)
  const isIncome = transaction.kind === TransactionType.INCOME

  return (
    <Box className="flex-1">
      <Text className="text-muted-foreground">{dueAt}</Text>
      <Box className="flex-row justify-between gap-2">
        <Text numberOfLines={1} size="lg">
          {transaction.description}
        </Text>
        <Text
          bold
          className={isIncome ? "text-success" : "text-destructive"}
          size="lg"
        >
          {isIncome ? "" : "-"}
          {amount}
        </Text>
      </Box>
    </Box>
  )
}
