import { Card } from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { Frequence } from "~/store/slices/recurrence"

const label = {
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
    <Card size="xs" className="rounded-md px-1">
      <Text size="sm" className="text-secondary-500 leading-5 tracking-wide">
        {label[value]}
      </Text>
    </Card>
  )
}
