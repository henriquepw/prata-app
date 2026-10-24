import { Card } from "~/components/card"
import { Text } from "~/components/text"
import { TransactionType } from "../store/types"

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
      <Text className="text-primary leading-5 tracking-wide" size="sm">
        {label[value]}
      </Text>
    </Card>
  )
}
