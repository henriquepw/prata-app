import { Trash2Icon } from "lucide-react-native"
import { forwardRef, type Ref } from "react"
import { useWindowDimensions } from "react-native"
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"
import { Icon } from "~/shared/components/icon"
import { Text } from "~/shared/components/text"

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
export const RecurrenceSwipe = forwardRef(
  ({ children, onDelete }: Props, ref: Ref<SwipeableMethods>) => {
    return (
      <Swipeable
        friction={2}
        onSwipeableOpen={onDelete}
        overshootRight={false}
        ref={ref}
        renderRightActions={RightAction}
        rightThreshold={40}
      >
        {children}
      </Swipeable>
    )
  },
)
