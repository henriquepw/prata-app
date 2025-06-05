import { Href, Link } from "expo-router"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from "lucide-react-native"
import { Pressable, TouchableOpacity } from "react-native"
import Animated, {
  SlideInRight,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box } from "~/components/ui/box"
import { Icon } from "~/components/ui/icon"
import { Text } from "~/components/ui/text"
import { useToggle } from "~/hooks/use-toggle"
import { cn } from "~/utils/cn"

const BTN_OPEN_SCALE = 0.7

type Props = {
  label: string
  icon: React.ElementType
  href: Href
  enteringDelay: number
  exitingDelay: number
}
function FabItem({ enteringDelay, exitingDelay, href, icon, label }: Props) {
  return (
    <Link asChild href={href}>
      <TouchableOpacity className="flex-row items-center">
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
    <Box
      className="absolute right-6 bottom-2 flex items-end"
      style={{ paddingBottom: bottom, paddingRight: right }}
    >
      {open && (
        <Box className="mb-4 flex items-end gap-4">
          <FabItem
            enteringDelay={80}
            exitingDelay={0}
            icon={ArrowUpIcon}
            label="Entrada"
            href="/(private)/transations/new-income"
          />
          <FabItem
            enteringDelay={0}
            exitingDelay={80}
            icon={ArrowDownIcon}
            label="Saída"
            href="/(private)/transations/new-outcome"
          />
        </Box>
      )}

      <Animated.View style={btnStyle}>
        <Pressable
          className={cn(
            "size-11 items-center justify-center rounded-full",
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
            />
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Box>
  )
}
