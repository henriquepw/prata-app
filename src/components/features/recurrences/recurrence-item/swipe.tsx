import { Trash2Icon } from "lucide-react-native"
import { useRef } from "react"
import { useWindowDimensions } from "react-native"
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"
import { Icon } from "~/components/ui/icon"
import { Text } from "~/components/ui/text"

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
  children: React.ReactNode
  onDelete: () => void
}
export function RecurrenceSwipe({ children, onDelete }: Props) {
  const swipeableRef = useRef<SwipeableMethods>(null)

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
      renderRightActions={RightAction}
      onSwipeableOpen={onDelete}
    >
      {children}
    </Swipeable>
  )
}
