import { Link } from "expo-router"
import { Edit3Icon, Trash2Icon } from "lucide-react-native"
import { useWindowDimensions, View } from "react-native"
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  type SharedValue,
  useAnimatedStyle,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { Box } from "~/components/box"
import { Button, ButtonIcon, ButtonText } from "~/components/button"
import { Card } from "~/components/card"
import { Divider } from "~/components/divider"
import { Portal } from "~/components/portal"
import { Text } from "~/components/text"
import type { Recurrence } from "~/features/recurrence/store/types"
import { formatAmount } from "~/lib/format-amount"
import { formatDate } from "~/lib/format-date"
import { useSelectRecurrence } from "../store/selected-recurrence"
import { FrequenceBadge } from "./frequance-badge"

type Props = {
  item: Recurrence
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  top: SharedValue<number>
}
export function RecurrenceDetail({
  item,
  isOpen,
  onDelete,
  onClose,
  top,
}: Props) {
  const selectRecurrence = useSelectRecurrence()

  const { width, height } = useWindowDimensions()
  const modalStyle = useAnimatedStyle(() => ({
    top: top.value,
  }))

  if (!isOpen) {
    return null
  }

  return (
    <Portal isOpen>
      <GestureHandlerRootView>
        <View className="flex-1 items-center justify-center p-4">
          <Animated.View
            className="bg-background/40 absolute top-0 left-0"
            entering={FadeIn}
            exiting={FadeOut}
            style={{ width, height }}
          >
            <Pressable className="flex-1" onPress={onClose} />
          </Animated.View>

          <Animated.View
            className="absolute left-4 w-full"
            entering={ZoomIn}
            exiting={ZoomOut}
            style={modalStyle}
          >
            <Card contentClassName="gap-2">
              <Box className="flex-row items-end justify-between gap-4">
                <Box className="flex-1 items-start">
                  <FrequenceBadge value={item.frequence} />
                  <Text numberOfLines={1} size="lg">
                    {item.description}
                  </Text>
                </Box>
                <Box className="items-end">
                  <Text className="text-muted-foreground" size="sm">
                    {formatDate(item.startAt)}
                  </Text>
                  <Text className="font-medium" size="lg">
                    {formatAmount(item.amount)}
                  </Text>
                </Box>
              </Box>
              <Divider />

              <Box className="flex-row items-center justify-between">
                <Text>Iniciado em </Text>
                <Text className="font-bold">{formatDate(item.startAt)}</Text>
              </Box>
              <Box className="flex-row items-center justify-between">
                <Text>Finalizada em </Text>
                <Text className="font-bold">Sem prazo</Text>
              </Box>
              <Box className="flex-row items-center justify-between">
                <Text>Proxíma registro</Text>
                <Text className="font-bold">XX</Text>
              </Box>
              <Divider />

              <Box className="mt-2 flex-row items-center justify-stretch gap-4">
                <Button
                  action="negative"
                  className="flex-1"
                  onPress={() => {
                    onClose()
                    onDelete()
                  }}
                  size="sm"
                >
                  <ButtonIcon as={Trash2Icon} />
                  <ButtonText>Deletar</ButtonText>
                </Button>
                <Link
                  asChild
                  href={`/recurrences/${item.id}`}
                  onPressIn={() => selectRecurrence(item)}
                  onPressOut={onClose}
                >
                  <Button className="flex-1" size="sm">
                    <ButtonIcon as={Edit3Icon} />
                    <ButtonText>Editar</ButtonText>
                  </Button>
                </Link>
              </Box>
            </Card>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Portal>
  )
}
