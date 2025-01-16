import { Text } from "@ui/text"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, View } from "react-native"
import { BalanceCard } from "~/components/balance/balance-card"
import { TransationDetail } from "~/components/transations/transation-detail"
import { IncomeList } from "~/components/transations/transation-list"
import { UserHeader } from "~/components/user-header"
import { useTheme } from "~/store/theme-store"

export default function HomePage() {
  const theme = useTheme()
  return (
    <View className="flex-1 bg-background-50 px-4">
      <StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaView className="flex-1 gap-6 p-4">
        <UserHeader title="Anônimo" subtitle="Cadastrar" />
        <BalanceCard />

        <View className="gap-2">
          <Text className="font-medium text-lg text-typography-900">
            Últimos Registros
          </Text>
          <IncomeList />
        </View>
      </SafeAreaView>
      <TransationDetail />
    </View>
  )
}
