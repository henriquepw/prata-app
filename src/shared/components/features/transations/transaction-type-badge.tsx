import { Card } from "~/shared/components/ui/card"
import { Text } from "~/shared/components/ui/text"
import { TransactionType } from "~/shared/store/slices/transation"

const label = {
  [TransactionType.INCOME]: "Entrada",
  [TransactionType.OUTCOME]: "Saída",
}

type Props = {
  value: TransactionType
}
export function TransactionTypeBadge({ value }: Props) {
  return (
    <Card className="mr-auto rounded-md px-1" size="xs">
      <Text className="text-secondary-500 leading-5 tracking-wide" size="sm">
        {label[value]}
      </Text>
    </Card>
  )
}
