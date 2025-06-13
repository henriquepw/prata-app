import { createContext, use, useMemo, useRef, useState } from "react"
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
} from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated"
import { cn } from "~/utils/cn"
import { Box } from "./box"
import { Text } from "./text"

const GAP = 7

type TabAttr = {
  width: number
}

type TabStore = {
  value: string
  selectTab: (idx: number, value: string) => void
  setTabRef: (tab: TabAttr, index: number) => void
}
const context = createContext({} as TabStore)

type Props = {
  children: React.ReactNode
  className?: string
  onChange: (value: string) => void
}
export function Selector({ children, onChange, className }: Props) {
  const tabRefs = useRef<TabAttr[]>([])
  const [value, setValue] = useState("")
  const translate = useSharedValue(0)
  const scaleY = useSharedValue(1)
  const width = useSharedValue(0)

  const bgStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }, { scaleY: scaleY.value }],
    width: width.value,
  }))

  const ctx = useMemo(
    () => ({
      value,
      selectTab: (idx: number, value: string) => {
        let translateX = 0
        for (const t of tabRefs.current.slice(0, idx)) {
          translateX += GAP + (t.width ?? 0)
        }

        translate.value = withSpring(translateX, { damping: 25 })
        width.value = withSpring(tabRefs.current[idx].width)
        scaleY.value = withSequence(withSpring(0.9), withSpring(1))
        setValue(value)
        onChange?.(value)
      },
      setTabRef: (ref: TabAttr, idx: number) => {
        tabRefs.current[idx] = ref
        if (width.value === 0 && idx === 0) {
          width.value = withSpring(tabRefs.current[idx].width)
        }
      },
    }),
    // WARNING: onChange cause rerenders all time
    [value, translate, width, scaleY, onChange],
  )

  return (
    <context.Provider value={ctx}>
      <Box
        className={cn(
          "relative mr-auto flex-row items-center gap-2",
          className,
        )}
      >
        <Animated.View
          className="absolute left-0 h-10 rounded bg-primary-500/40"
          style={bgStyle}
        />
        {children}
      </Box>
    </context.Provider>
  )
}

type ItemProps = {
  index: number
  value: string
  label: string
}
export function SelectorItem({ index, value, label }: ItemProps) {
  const ctx = use(context)

  const onPress = (_: GestureResponderEvent) => {
    ctx.selectTab(index, value)
  }

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout
    ctx.setTabRef({ width }, index)
  }

  return (
    <Pressable onPress={onPress} onLayout={onLayout}>
      <Box className="rounded px-3 py-1">
        <Text size="xl" className="text-typography-950">
          {label}
        </Text>
      </Box>
    </Pressable>
  )
}
