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

const BTN_OPEN_SCALE = 0.75

type Props = {
  label: string
  icon: React.ElementType
  href: Href
}
function FabItem({ href, icon, label }: Props) {
  return (
    <Animated.View
    // entering={FadeInDown.springify()}
    // exiting={FadeOutDown.springify()}
    >
      <Link asChild href={href}>
        <TouchableOpacity className="flex-row items-center">
          <Box className="overflow-hidden pr-2 pl-6">
            <Animated.View
              entering={SlideInRight.delay(150).springify().damping(15)}
              exiting={SlideOutRight.springify().mass(5)}
            >
              <Text size="xl">{label}</Text>
            </Animated.View>
          </Box>
          <Animated.View
            className="size-10 items-center justify-center rounded-full bg-primary-500"
            entering={ZoomIn.springify()}
            exiting={ZoomOut.springify()}
          >
            <Icon as={icon} className="text-typography-0" />
          </Animated.View>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  )
}

export function NewTransationFab() {
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
            icon={ArrowUpIcon}
            label="Entrada"
            href="/(private)/transations/new-income"
          />
          <FabItem
            icon={ArrowDownIcon}
            label="Saída"
            href="/(private)/transations/new-outcome"
          />
        </Box>
      )}

      <Animated.View style={btnStyle}>
        <Pressable
          className={cn(
            "size-10 items-center justify-center rounded-full",
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
