import { Feather } from "@expo/vector-icons"
import { Button, Text, View } from "react-native"
import { useToggleTheme } from "../store/theme-store"

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
        <Text className="font-bold text-primary-dim text-xl leading-none">
          {title}
        </Text>
        <Text className="text-neutral-dim underline">{subtitle}</Text>
      </View>
      <Button title="a" onPress={toggleTheme} />
    </View>
  )
}
