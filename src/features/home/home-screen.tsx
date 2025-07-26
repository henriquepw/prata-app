import { Suspense } from "react"
import { ScrollView } from "react-native"
import {
  BalanceView,
  BalanceViewFallback,
} from "~/features/balance/components/balance-view"
import { Heading } from "~/shared/components/heading"
import { ScreenRoot } from "~/shared/components/layouts/screen"
import { SkeletonBarChart } from "~/shared/components/skeleton/skeleton-bar-chart"
import { TransactionYearlyChart } from "../transaction/components/transaction-yearly-chart"
import { TransactionLastList } from "../transaction/components/transation-last-list"
import { UserHeader } from "./components/user-header"

export function HomeScreen() {
  return (
    <ScreenRoot>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserHeader />

        <Suspense fallback={<BalanceViewFallback />}>
          <BalanceView />
        </Suspense>

        <Suspense fallback={<SkeletonBarChart />}>
          <TransactionYearlyChart />
        </Suspense>

        <Heading className="mt-6 mb-2 text-center">
          Últimas Movimentações
        </Heading>
        <TransactionLastList />
      </ScrollView>
    </ScreenRoot>
  )
}
