import { ScrollView } from "react-native"
import { BalanceCard } from "~/shared/components/features/balance/balance-card"
import { BalanceView } from "~/shared/components/features/balance/balance-view"
import { TransactionList } from "~/shared/components/features/transations/transation-list"
import { Card } from "~/shared/components/ui/card"
import { Heading } from "~/shared/components/ui/heading"
import { ScreenRoot } from "~/shared/components/ui/layouts/screen"
import { UserHeader } from "~/shared/components/user/user-header"

export default function HomePage() {
  return (
    <ScreenRoot>
      <ScrollView>
        <UserHeader />
        <BalanceCard />
        <BalanceView />

        <Card>
          <Heading className="mb-2 text-center">Últimos Registros</Heading>
          <TransactionList />
        </Card>
      </ScrollView>
    </ScreenRoot>
  )
}
