import { Link } from "expo-router"
import { Edit3Icon, Trash2Icon } from "lucide-react-native"
import { useWindowDimensions, View } from "react-native"
import { Pressable } from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  type SharedValue,
  useAnimatedStyle,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import type { Recurrence } from "~/features/recurrence/store/recurrence"
import { Box } from "~/shared/components/box"
import { Button, ButtonIcon, ButtonText } from "~/shared/components/button"
import { Card } from "~/shared/components/card"
import { Divider } from "~/shared/components/divider"
import { Portal } from "~/shared/components/portal"
import { Text } from "~/shared/components/text"
import { formatAmount } from "~/shared/utils/format-amount"
import { formatDate } from "~/shared/utils/format-date"
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
  const { width, height } = useWindowDimensions()
  const modalStyle = useAnimatedStyle(() => ({
    top: top.value,
  }))

  if (!isOpen) {
    return null
  }

  return (
    <Portal isOpen>
      <View className="flex-1 items-center justify-center p-4">
        <Animated.View
          className="absolute top-0 left-0 bg-background-0/40"
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
                <Text className="text-typography-500" size="sm">
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
    </Portal>
  )
}
