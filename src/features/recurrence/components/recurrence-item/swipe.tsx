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
import { Icon } from "~/components/icon"
import { Text } from "~/components/text"

type RightActionProps = {
  drag: SharedValue<number>
}
function RightAction({ drag }: RightActionProps) {
  const { width } = useWindowDimensions()
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + width - 28 }],
  }))

  return (
    <Animated.View
      className="bg-destructive/80 w-full justify-center p-4"
      style={containerStyle}
    >
      <Animated.View className="flex-row items-center justify-start gap-2">
        <Icon as={Trash2Icon} className="text-foreground" size="xl" />
        <Text className="text-foreground font-bold">Deletar</Text>
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
        renderRightActions={(_prog, drag) => <RightAction drag={drag} />}
        rightThreshold={40}
      >
        {children}
      </Swipeable>
    )
  },
)
