import { SafeAreaView, View } from "react-native"
import { BalanceCard } from "~/components/features/balance/balance-card"
import { BalanceView } from "~/components/features/balance/balance-view"
import { TransationDetail } from "~/components/features/transations/transation-detail"
import { UserHeader } from "~/components/features/user/user-header"

export default function HomePage() {
  return (
    <View className="flex-1 px-4">
      <SafeAreaView className="flex-1 gap-6 p-4">
        <UserHeader />
        <BalanceCard />
        <BalanceView />

        {/* <Card> */}
        {/*   <Heading className="mb-2 text-center">Últimos Registros</Heading> */}
        {/*   <IncomeList /> */}
        {/* </Card> */}
      </SafeAreaView>
      <TransationDetail />
    </View>
  )
}
