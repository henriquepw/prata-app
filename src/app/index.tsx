import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TransationDetail } from "../components/transations/transation-detail"
import { IncomeList } from "../components/transations/transation-list"
import { Card } from "../components/ui/card"
import { UserHeader } from "../components/user-header"
import { useTheme } from "../store/theme-store"
import { NewTransationFab } from "../components/transations/new-transation-fab"

export default function DashboardScreen() {
  const theme = useTheme()

  return (
    <View className="flex-1 bg-neutral-2 dark:bg-neutraldark-1">
      <StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaView className="flex-1 gap-6 p-4">
        <UserHeader title="Anônimo" subtitle="Cadastrar" />
        <Card className="h-24">
          <Text>TODO</Text>
        </Card>

        <View className="gap-2">
          <Text className="font-medium text-lg text-neutral-normal">
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
