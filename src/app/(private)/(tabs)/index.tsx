import { SafeAreaView, View } from "react-native"
import { BalanceCard } from "~/components/features/balance/balance-card"
import { BalanceView } from "~/components/features/balance/balance-view"
import { TransactionList } from "~/components/features/transations/transation-list"
import { UserHeader } from "~/components/features/user/user-header"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"

export default function HomePage() {
  return (
    <View className="flex-1 px-4">
      <SafeAreaView className="flex-1 gap-6 p-4">
        <UserHeader />
        <BalanceCard />
        <BalanceView />

        <Card>
          <Heading className="mb-2 text-center">Últimos Registros</Heading>
          <TransactionList />
        </Card>
      </SafeAreaView>
      {/* <TransationDetail /> */}
    </View>
  )
}
