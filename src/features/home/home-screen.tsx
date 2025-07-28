import { Suspense } from "react"
import { ScrollView, View } from "react-native"
import {
  BalanceView,
  BalanceViewFallback,
} from "~/features/balance/components/balance-view"
import { Heading } from "~/shared/components/heading"
import { ScreenRoot } from "~/shared/components/layouts/screen"
import { SkeletonBarChart } from "~/shared/components/skeleton/skeleton-bar-chart"
import { OutcomeByBalanceChart } from "../transaction/components/charts/outcome-by-balance-chart"
import { YearlyOutcomeChart } from "../transaction/components/charts/yearly-outcome-chart"
import { TransactionLastList } from "../transaction/components/transation-last-list"
import { Carousel } from "./components/carousel"
import { UserHeader } from "./components/user-header"

export function HomeScreen() {
  return (
    <ScreenRoot className="px-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4">
          <UserHeader />

          <Suspense fallback={<BalanceViewFallback />}>
            <BalanceView />
          </Suspense>
        </View>

        <Suspense fallback={<SkeletonBarChart />}>
          <Carousel>
            <YearlyOutcomeChart />
            <OutcomeByBalanceChart />
          </Carousel>
        </Suspense>

        <View className="px-4">
          <Heading className="mt-6 mb-2 text-center">
            Últimas Movimentações
          </Heading>
          <TransactionLastList />
        </View>
      </ScrollView>
    </ScreenRoot>
  )
}
