import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, ButtonIcon, ButtonText } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { IncomeIcon, OutcomeIcon } from "../components/ui/icons"
import { Text } from "../components/ui/text"
import { UserHeader } from "../components/user-header"
import { useTheme } from "../store/theme-store"

export default function Index() {
  const theme = useTheme()

  return (
    <View className="flex-1 bg-primary-2 dark:bg-primarydark-1">
      <StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaView className="flex-1 gap-6 p-4">
        <UserHeader title="Anônimo" subtitle="Cadastrar" />
        <Card className="h-24">
          <Text>TODO</Text>
        </Card>
        <View className="flex-row justify-stretch gap-2">
          <Button className="grow">
            <ButtonIcon icon={IncomeIcon} />
            <ButtonText>Entradas</ButtonText>
          </Button>
          <Button className="grow">
            <ButtonIcon icon={OutcomeIcon} />
            <ButtonText>Dispesas</ButtonText>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
}
