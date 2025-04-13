import { SafeAreaView, View } from "react-native"
import { BalanceCard } from "~/components/balance/balance-card"
import { TransationDetail } from "~/components/transations/transation-detail"
import { IncomeList } from "~/components/transations/transation-list"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"
import { UserHeader } from "~/components/user-header"

export default function HomePage() {
  return (
    <View className="flex-1 px-4">
      <SafeAreaView className="flex-1 gap-6 p-4">
        <UserHeader title="Anônimo" subtitle="Cadastrar" />
        <BalanceCard />

        <Card>
          <Heading className="mb-2 text-center">Últimos Registros</Heading>
          <IncomeList />
        </Card>
      </SafeAreaView>
      <TransationDetail />
    </View>
  )
}
