import { Trash2Icon } from "lucide-react-native"
import { Alert, useWindowDimensions } from "react-native"
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"
import { Box } from "~/components/ui/box"
import { Icon } from "~/components/ui/icon"
import { Text } from "~/components/ui/text"
import { Recurrence, useDeleteRecurrence } from "~/store/slices/recurrence"
import { formatAmount } from "~/utils/format-amount"
import { formatDate } from "~/utils/format-date"
import { FrequenceBadge } from "./frequance-badge"
import { useRef } from "react"

function RightAction(_prog: SharedValue<number>, drag: SharedValue<number>) {
  const { width } = useWindowDimensions()
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + width - 28 }],
  }))

  return (
    <Animated.View
      className="w-full justify-center bg-error-500/80 p-4"
      style={containerStyle}
    >
      <Animated.View className="flex-row items-center justify-start gap-2">
        <Icon as={Trash2Icon} className="text-typography-950" size="xl" />
        <Text className="font-bold text-typography-950">Deletar</Text>
      </Animated.View>
    </Animated.View>
  )
}

type Props = {
  item: Recurrence
}
export function RecurrenceCard({ item }: Props) {
  const ref = useRef<SwipeableMethods>(null)
  const deleteRecurrence = useDeleteRecurrence()

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      return
    }

    Alert.alert("Tem certeza que deseja deletar essa recorrência?", undefined, [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => ref.current?.close(),
      },
      {
        isPreferred: true,
        text: "Deletar",
        style: "destructive",
        onPress: () => deleteRecurrence.mutate(item),
      },
    ])
  }

  return (
    <Swipeable
      ref={ref}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
      renderRightActions={RightAction}
      onSwipeableOpen={handleSwipe}
    >
      <Box className="flex-row items-end justify-between gap-4 py-2">
        <Box className="ml-2 flex-1 items-start">
          <FrequenceBadge value={item.frequence} />
          <Text size="lg" numberOfLines={1}>
            {item.description}
          </Text>
        </Box>
        <Box className="mr-2 items-end">
          <Text size="sm" className="text-typography-500">
            {formatDate(item.startAt)}
          </Text>
          <Text size="lg" className="font-medium">
            {formatAmount(item.amount)}
          </Text>
        </Box>
      </Box>
    </Swipeable>
  )
}
