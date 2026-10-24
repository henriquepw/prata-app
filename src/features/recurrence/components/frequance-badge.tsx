import { Card } from "~/components/card"
import { Text } from "~/components/text"
import { Frequence } from "../store/types"

export const frequenceLabel = {
  [Frequence.DAILY]: "Diário",
  [Frequence.WEEKLY]: "Semanal",
  [Frequence.BIWEEKLY]: "Quinzenal",
  [Frequence.MONTHLY]: "Mensal",
  [Frequence.YEARLY]: "Anual",
}

type Props = {
  value: Frequence
}
export function FrequenceBadge({ value }: Props) {
  return (
    <Card className="rounded-md px-1" size="xs">
      <Text className="text-secondary-500 leading-5 tracking-wide" size="sm">
        {frequenceLabel[value]}
      </Text>
    </Card>
  )
}
