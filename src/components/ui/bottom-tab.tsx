import { BlurView } from "expo-blur"
import { Ref, createContext, forwardRef, use, useMemo } from "react"
import { View, Pressable, GestureResponderEvent } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useTheme } from "~/store/slices/theme"
import { TabTriggerSlotProps } from "expo-router/ui"
import { Icon } from "~/components/ui/icon"

const BTN_SIZE = 44
const BTN_GAP = 4

type TabStore = {
  selectTab: (idx: number) => void
}
const context = createContext({} as TabStore)

type ViewProps = {
  children: React.ReactNode
}
export const TabView = forwardRef(
  ({ children }: ViewProps, ref: Ref<BlurView>) => {
    const theme = useTheme()
    const translate = useSharedValue(4)

    const bgStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translate.value }],
    }))

    const ctx = useMemo(
      () => ({
        selectTab: (idx: number) => {
          translate.value = withSpring(BTN_GAP + idx * BTN_SIZE, {
            damping: 13,
          })
        },
      }),
      [translate],
    )

    return (
      <context.Provider value={ctx}>
        <BlurView
          ref={ref}
          intensity={100}
          tint={theme}
          experimentalBlurMethod="dimezisBlurView"
          className="-translate-x-1/2 absolute bottom-10 left-1/2 flex-row items-center gap-2 overflow-hidden rounded-full border border-outline-100 p-1"
        >
          <Animated.View
            className="absolute left-0 size-11 rounded-full bg-primary-500"
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
}
export const TabButton = forwardRef(
  (
    { index, icon, children, isFocused, ...props }: BtnProps,
    ref: Ref<View>,
  ) => {
    const ctx = use(context)

    const onPress = (e: GestureResponderEvent) => {
      console.log("aaa")
      ctx.selectTab(index)
      props.onPress?.(e)
    }

    return (
      <Pressable
        ref={ref}
        {...props}
        onPress={onPress}
        className="size-11 rounded-full active:opacity-50"
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
      </Pressable>
    )
  },
)
