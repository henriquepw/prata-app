import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-orange-2">
      <StatusBar translucent style="dark" />
      <Text>TODO</Text>
    </View>
  )
}
