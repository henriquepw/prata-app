import { Card } from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { TransactionType } from "~/store/slices/transation"

const label = {
  [TransactionType.INCOME]: "Entrada",
  [TransactionType.OUTCOME]: "Saída",
}

type Props = {
  value: TransactionType
}
export function TransactionTypeBadge({ value }: Props) {
  return (
    <Card size="xs" className="mr-auto rounded-md px-1">
      <Text size="sm" className="text-secondary-500 leading-5 tracking-wide">
        {label[value]}
      </Text>
    </Card>
  )
}
