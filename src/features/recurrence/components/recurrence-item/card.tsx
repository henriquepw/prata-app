import { View } from "react-native"
import { cssInterop } from "react-native-css-interop"
import { Pressable } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import type { Recurrence } from "~/features/recurrence/store/types"
import { Box } from "~/shared/components/box"
import { Text } from "~/shared/components/text"
import { formatAmount } from "~/shared/utils/format-amount"
import { formatDate } from "~/shared/utils/format-date"
import { FrequenceBadge } from "../frequance-badge"

cssInterop(Pressable, {
  className: {
    target: "style",
  },
})

type Props = {
  item: Recurrence
  onPress: () => void
}
export function RecurrenceCard({ item, onPress }: Props) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(1)

  const rootStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  const bgStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.95)
    opacity.value = withTiming(1)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
    opacity.value = withTiming(0)
  }

  return (
    <Animated.View style={rootStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          className="absolute top-0 left-0 h-full w-full rounded border border-outline-100 bg-background-50/50"
          style={bgStyle}
        />
        <View className="flex-1 flex-row items-end justify-between gap-4 px-1 py-3">
          <Box className="ml-2 flex-1 items-start">
            <FrequenceBadge value={item.frequence} />
            <Text numberOfLines={1} size="lg">
              {item.description}
            </Text>
          </Box>
          <Box className="mr-2 items-end">
            <Text className="text-typography-500" size="sm">
              {formatDate(item.startAt)}
            </Text>
            <Text className="font-medium" size="lg">
              {formatAmount(item.amount)}
            </Text>
          </Box>
        </View>
      </Pressable>
    </Animated.View>
  )
}
