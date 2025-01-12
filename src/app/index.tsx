import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BalanceCard } from "../components/balance/balance-card"
import { NewTransationFab } from "../components/transations/new-transation-fab"
import { TransationDetail } from "../components/transations/transation-detail"
import { IncomeList } from "../components/transations/transation-list"
import { UserHeader } from "../components/user-header"
import { useTheme } from "../store/theme-store"

export default function DashboardScreen() {
  const theme = useTheme()

  return (
    <View className="flex-1 bg-background-50">
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
      <NewTransationFab />
    </View>
  )
}
