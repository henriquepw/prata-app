import { Button, View } from "react-native"
import { Text } from "./ui/text"
import { useToggleTheme } from "../store/theme-store"
import { Feather } from "@expo/vector-icons"

type Props = {
  title: string
  subtitle: string
}

export function UserHeader({ title, subtitle }: Props) {
  const toggleTheme = useToggleTheme()
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-8 dark:bg-primarydark-8">
        <Feather
          name="user"
          className="color-primary-12 dark:color-primarydark-12 text-2xl"
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-xl leading-none">{title}</Text>
        <Text className="color-gray-11 dark:color-graydark-11 underline">
          {subtitle}
        </Text>
      </View>
      <Button title="a" onPress={toggleTheme} />
    </View>
  )
}
