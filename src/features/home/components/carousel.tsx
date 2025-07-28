/** biome-ignore-all lint/suspicious/noArrayIndexKey: the childrens dont change the position */
import { Children, useRef } from "react"
import { Pressable, useWindowDimensions, View } from "react-native"
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import type { AnimatedScrollView } from "react-native-reanimated/lib/typescript/component/ScrollView"
import { THEME } from "~/shared/components/gluestack-ui-provider/config"

type IndicatorProps = {
  onPress: () => void
  offset: SharedValue<number>
  width: number
  index: number
}
function Indicator({ onPress, offset, width, index }: IndicatorProps) {
  const style = useAnimatedStyle(() => {
    const prev = width * (index - 1)
    const curr = width * index
    const next = width * (index + 1)

    // TODO: can be animated better
    const active = Math.round(offset.value / width) === index

    return {
      width: interpolate(offset.value, [prev, curr, next], [8, 16, 8], "clamp"),
      backgroundColor: withTiming(
        active ? `rgb(${THEME.primary[5]})` : "white",
        { duration: 100 },
      ),
    }
  })

  return (
    <Pressable onPress={onPress}>
      <Animated.View className="mt-2 h-2 rounded-full bg-white" style={style} />
    </Pressable>
  )
}

type ItemProps = {
  width: number
  children: React.ReactNode
  offset: SharedValue<number>
  index: number
}
function Item({ children, width, offset, index }: ItemProps) {
  const style = useAnimatedStyle(() => {
    const prev = width * (index - 1)
    const curr = width * index
    const next = width * (index + 1)

    return {
      width,
      opacity: interpolate(
        offset.value,
        [prev, curr, next],
        [0.6, 1, 0.6],
        "clamp",
      ),
      transform: [
        {
          scale: interpolate(
            offset.value,
            [prev, curr, next],
            [0.95, 1, 0.95],
            "clamp",
          ),
        },
      ],
    }
  })

  return <Animated.View style={style}>{children}</Animated.View>
}

type Props = {
  children: React.ReactNode
}
export function Carousel({ children }: Props) {
  const offset = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler((event) => {
    offset.value = event.contentOffset.x
  })

  const scrollRef = useRef<AnimatedScrollView>(null)

  const dim = useWindowDimensions()
  const width = dim.width - 32

  const items = Children.toArray(children)

  return (
    <View className="w-full">
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        onScroll={scrollHandler}
      >
        {items.map((i, idx) => (
          <Item key={idx} width={width} offset={offset} index={idx}>
            {i}
          </Item>
        ))}
      </Animated.ScrollView>
      <View className="flex-row items-center justify-center gap-2">
        {items.map((_, idx) => (
          <Indicator
            key={idx}
            index={idx}
            offset={offset}
            width={width}
            onPress={() => {
              scrollRef.current?.scrollTo({ x: width * idx, animated: true })
            }}
          />
        ))}
      </View>
    </View>
  )
}
