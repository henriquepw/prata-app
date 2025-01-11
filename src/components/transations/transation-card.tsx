import { Text, TouchableOpacity, View } from "react-native"
import { Transation, useTransationStore } from "~/store/transation-store"
import { formatAmount } from "~/utils/format-amount"
import { formatDate } from "~/utils/format-date"
import { IncomeIcon } from "../ui/icons"

type Props = {
  transation: Transation
}
export function TransationCard({ transation }: Props) {
  const selectTransation = useTransationStore((s) => s.selectTransation)

  const amount = formatAmount(transation.amount)
  const dueAt = formatDate(transation.dueAt)

  return (
    <TouchableOpacity onPress={() => selectTransation(transation)}>
      <View className="flex-row items-center gap-4">
        <View className="size-14 items-center justify-center rounded-lg border border-greena-3 bg-greena-3 p-0">
          <IncomeIcon className="text-3xl text-greena-11" />
        </View>
        <View>
          <Text className="text-neutral-dim">{dueAt}</Text>
          <Text className="font-bold text-2xl text-green-dim">{amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
