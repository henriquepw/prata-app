import { Text, View } from "react-native"
import { Income } from "~/src/store/income-store"
import { IncomeIcon } from "../ui/icons"

type Props = {
  income: Income
}
export function IncomeCard({ income }: Props) {
  const amount = Number(income.amount / 100).toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  })

  const receivedAt = new Date(income.receivedAt).toLocaleString().slice(0, 10)

  return (
    <View className="flex-row items-center gap-4">
      <View className="size-14 items-center justify-center rounded-lg bg-green-solid">
        <IncomeIcon className="bg-green-solid text-3xl" />
      </View>
      <View>
        <Text className="text-neutral-dim">{receivedAt}</Text>
        <Text className="font-bold text-2xl text-neutral-normal">{amount}</Text>
      </View>
    </View>
  )
}
