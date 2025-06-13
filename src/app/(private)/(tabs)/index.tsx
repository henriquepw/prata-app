import { ScrollView } from "react-native"
import { BalanceCard } from "~/components/features/balance/balance-card"
import { BalanceView } from "~/components/features/balance/balance-view"
import { TransactionList } from "~/components/features/transations/transation-list"
import { UserHeader } from "~/components/features/user/user-header"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"
import { ScreenRoot } from "~/components/ui/layouts/screen"

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
          <TransactionList />
          <TransactionList />
        </Card>
      </ScrollView>
    </ScreenRoot>
  )
}
