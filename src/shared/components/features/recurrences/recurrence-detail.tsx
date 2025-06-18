import { Link } from "expo-router"
import { Edit3Icon, Trash2Icon } from "lucide-react-native"
import { View, useWindowDimensions } from "react-native"
import { Pressable } from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { Box } from "~/shared/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/shared/components/ui/button"
import { Card } from "~/shared/components/ui/card"
import { Divider } from "~/shared/components/ui/divider"
import { Portal } from "~/shared/components/ui/portal"
import { Text } from "~/shared/components/ui/text"
import { Recurrence } from "~/shared/store/slices/recurrence"
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
          style={{ width, height }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Pressable onPress={onClose} className="flex-1" />
        </Animated.View>

        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="absolute left-4 w-full"
          style={modalStyle}
        >
          <Card contentClassName="gap-2">
            <Box className="flex-row items-end justify-between gap-4">
              <Box className="flex-1 items-start">
                <FrequenceBadge value={item.frequence} />
                <Text size="lg" numberOfLines={1}>
                  {item.description}
                </Text>
              </Box>
              <Box className="items-end">
                <Text size="sm" className="text-typography-500">
                  {formatDate(item.startAt)}
                </Text>
                <Text size="lg" className="font-medium">
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
                size="sm"
                action="negative"
                className="flex-1"
                onPress={() => {
                  onClose()
                  onDelete()
                }}
              >
                <ButtonIcon as={Trash2Icon} />
                <ButtonText>Deletar</ButtonText>
              </Button>
              <Link
                asChild
                href={`/recurrences/${item.id}`}
                onPressOut={onClose}
              >
                <Button size="sm" className="flex-1">
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
