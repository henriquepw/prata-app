import { BlurView } from "expo-blur"
import { Ref, createContext, forwardRef, use, useMemo, useRef } from "react"
import {
  View,
  Pressable,
  GestureResponderEvent,
  LayoutChangeEvent,
} from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated"
import { useTheme } from "~/store/slices/theme"
import { TabTriggerSlotProps } from "expo-router/ui"
import { Icon } from "~/components/ui/icon"
import { Text } from "./text"

const BTN_GAP = 4

type TabAttr = {
  width: number
}

type TabStore = {
  selectTab: (idx: number) => void
  setTabRef: (tab: TabAttr, index: number) => void
}
const context = createContext({} as TabStore)

type ViewProps = {
  children: React.ReactNode
}
export const TabView = forwardRef(
  ({ children }: ViewProps, ref: Ref<BlurView>) => {
    const theme = useTheme()
    const tabRefs = useRef<TabAttr[]>([])
    const translate = useSharedValue(4)
    const scaleY = useSharedValue(1)
    const width = useSharedValue(0)

    const bgStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translate.value }, { scaleY: scaleY.value }],
      width: width.value,
    }))

    const ctx = useMemo(
      () => ({
        selectTab: (idx: number) => {
          let translateX = BTN_GAP
          for (const t of tabRefs.current.slice(0, idx)) {
            translateX += BTN_GAP + (t.width ?? 0)
          }

          translate.value = withSpring(translateX, { damping: 25 })
          width.value = withSpring(tabRefs.current[idx].width)
          scaleY.value = withSequence(withSpring(0.9), withSpring(1))
        },
        setTabRef: (ref: TabAttr, index: number) => {
          tabRefs.current[index] = ref
        },
      }),
      [translate, width, scaleY],
    )

    return (
      <context.Provider value={ctx}>
        <BlurView
          ref={ref}
          intensity={100}
          tint={theme}
          experimentalBlurMethod="dimezisBlurView"
          className="-translate-x-1/2 absolute bottom-10 left-1/2 flex-row items-center gap-1 overflow-hidden rounded-full border border-outline-100 p-1"
          style={{ paddingHorizontal: BTN_GAP }}
        >
          <Animated.View
            className="absolute left-0 h-10 rounded-full bg-primary-500"
            style={bgStyle}
          />
          {children}
        </BlurView>
      </context.Provider>
    )
  },
)

type BtnProps = TabTriggerSlotProps & {
  icon: React.ElementType
  index: number
  label: string
}
export const TabButton = forwardRef(
  (
    { index, label, icon, children, isFocused, ...props }: BtnProps,
    ref: Ref<View>,
  ) => {
    const ctx = use(context)

    const onPress = (e: GestureResponderEvent) => {
      ctx.selectTab(index)
      props.onPress?.(e)
    }

    const onLayout = (e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout
      ctx.setTabRef({ width }, index)
      props.onLayout?.(e)
    }

    return (
      <Pressable
        ref={ref}
        {...props}
        onLayout={onLayout}
        onPress={onPress}
        className="h-11 flex-row items-center gap-2 rounded-full px-2 active:opacity-50"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Icon
          as={icon}
          size="xl"
          className={
            isFocused
              ? "text-typography-0"
              : "text-typography-800 dark:text-typography-900"
          }
        />
        {!!label && (
          <Text
            className={
              isFocused
                ? "text-typography-0"
                : "text-typography-800 dark:text-typography-900"
            }
          >
            {label}
          </Text>
        )}
      </Pressable>
    )
  },
)
