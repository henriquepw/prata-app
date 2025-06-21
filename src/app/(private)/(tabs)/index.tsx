import { ScrollView } from "react-native"
import { BalanceCard } from "~/features/balance/components/balance-card"
import { BalanceView } from "~/features/balance/components/balance-view"
import { TransactionList } from "~/features/transaction/components/transation-list"
import { UserHeader } from "~/features/user/components/user-header"
import { Card } from "~/shared/components/card"
import { Heading } from "~/shared/components/heading"
import { ScreenRoot } from "~/shared/components/layouts/screen"

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
