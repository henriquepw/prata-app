import { View } from "react-native"
import { useIncomes } from "~/src/store/income-store"
import { IncomeCard } from "./income-card"

export function IncomeList() {
  const incomes = useIncomes((s) => s.incomes)
  return (
    <View className="gap-4">
      {incomes.map((i) => (
        <IncomeCard key={i.id} income={i} />
      ))}
    </View>
  )
}
