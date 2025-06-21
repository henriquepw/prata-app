import { type Href, Link } from "expo-router"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PinIcon,
  PlusIcon,
} from "lucide-react-native"
import { Platform, Pressable, TouchableOpacity } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box } from "~/shared/components/box"
import { Glass } from "~/shared/components/glass"
import { Icon } from "~/shared/components/icon"
import { Text } from "~/shared/components/text"
import { useToggle } from "~/shared/hooks/use-toggle"
import { cn } from "~/shared/utils/cn"

const BTN_OPEN_SCALE = 0.6

type Props = {
  label: string
  icon: React.ElementType
  href: Href
  enteringDelay: number
  exitingDelay: number
  onPress: () => void
}
function FabItem({
  enteringDelay,
  exitingDelay,
  href,
  icon,
  label,
  onPress,
}: Props) {
  return (
    <Link asChild href={href} onPress={onPress}>
      <TouchableOpacity className="flex-row items-center" onBlur={onPress}>
        <Box className="overflow-hidden pr-2 pl-6">
          <Animated.View
            entering={SlideInRight.delay(enteringDelay + 150)
              .springify()
              .damping(15)}
            exiting={SlideOutRight.delay(exitingDelay).springify().mass(5)}
          >
            <Text size="xl">{label}</Text>
          </Animated.View>
        </Box>
        <Animated.View
          className="size-10 items-center justify-center rounded-full bg-primary-500"
          entering={ZoomIn.delay(enteringDelay).springify()}
          exiting={ZoomOut.delay(exitingDelay).springify()}
        >
          <Icon as={icon} className="text-typography-0" />
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )
}

export function TransationFab() {
  const { bottom, right } = useSafeAreaInsets()
  const [open, setTogger] = useToggle()

  const scale = useSharedValue(1)
  const rotate = useSharedValue(0)
  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }))

  const onPressIn = () => {
    rotate.value = withSpring(open ? 0 : 135)
    scale.value = withSpring(BTN_OPEN_SCALE * 0.9, {
      mass: 1.5,
      damping: 5,
      stiffness: 140,
    })
  }

  const onPressOut = () => {
    setTogger()
    scale.value = withSpring(!open ? BTN_OPEN_SCALE : 1)
  }

  return (
    <>
      {open && (
        <Animated.View
          className="absolute inset-0 top-0 flex-1 bg-transparent"
          entering={FadeIn}
          exiting={FadeOut}
          onTouchStart={onPressOut}
        >
          <Glass className="flex-1" intensity={20} />
        </Animated.View>
      )}
      <Box
        className={cn(
          "absolute right-8 bottom-0 flex items-end",
          Platform.OS !== "ios" && "bottom-3",
        )}
        style={{ paddingBottom: bottom, paddingRight: right }}
      >
        {open && (
          <Box className="mr-2 mb-4 flex items-end gap-4">
            <FabItem
              enteringDelay={160}
              exitingDelay={0}
              href="/(private)/recurrences/register"
              icon={PinIcon}
              label="Fixos"
              onPress={onPressOut}
            />
            <FabItem
              enteringDelay={80}
              exitingDelay={80}
              href="/(private)/transations/new-income"
              icon={ArrowUpIcon}
              label="Entrada"
              onPress={onPressOut}
            />
            <FabItem
              enteringDelay={0}
              exitingDelay={160}
              href="/(private)/transations/new-outcome"
              icon={ArrowDownIcon}
              label="Saída"
              onPress={onPressOut}
            />
          </Box>
        )}

        <Animated.View style={btnStyle}>
          <Pressable
            className={cn(
              "size-14 items-center justify-center rounded-full",
              open
                ? "border-2 border-primary-500 bg-background-0"
                : "bg-primary-500",
            )}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Animated.View style={iconStyle}>
              <Icon
                as={PlusIcon}
                className={open ? "text-primary-500" : "text-typography-0"}
                size="xl"
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Box>
    </>
  )
}
