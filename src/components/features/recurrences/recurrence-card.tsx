import { Edit3Icon, Trash2Icon, XIcon } from "lucide-react-native"
import { Alert, useWindowDimensions, View, Pressable } from "react-native"
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { Box } from "~/components/ui/box"
import { Icon } from "~/components/ui/icon"
import { Text } from "~/components/ui/text"
import { Recurrence, useDeleteRecurrence } from "~/store/slices/recurrence"
import { formatAmount } from "~/utils/format-amount"
import { formatDate } from "~/utils/format-date"
import { FrequenceBadge } from "./frequance-badge"
import { useEffect, useRef } from "react"
import { Card } from "~/components/ui/card"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Divider } from "~/components/ui/divider"
import { useToggle } from "~/hooks/use-toggle"
import { Portal } from "~/components/ui/portal"

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
  item: Recurrence
}
export function RecurrenceCard({ item }: Props) {
  const swipeableRef = useRef<SwipeableMethods>(null)
  const rootRef = useRef<View>(null)
  const top = useSharedValue(0)
  useEffect(() => {
    rootRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      top.value = pageY
    })
  }, [top])

  const { width, height } = useWindowDimensions()
  const [open, toggleDetails] = useToggle()

  const deleteRecurrence = useDeleteRecurrence()

  const modalStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    }
  })

  const handleDelete = () => {
    Alert.alert("Tem certeza que deseja deletar essa recorrência?", undefined, [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => swipeableRef.current?.close(),
      },
      {
        isPreferred: true,
        text: "Deletar",
        style: "destructive",
        onPress: () => deleteRecurrence.mutate(item),
      },
    ])
  }

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      handleDelete()
    }
  }

  return (
    <View ref={rootRef}>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        rightThreshold={40}
        overshootRight={false}
        renderRightActions={RightAction}
        onSwipeableOpen={handleSwipe}
      >
        <Pressable
          className="flex-row items-end justify-between gap-4 py-2"
          onPress={toggleDetails}
        >
          <Box className="ml-2 flex-1 items-start">
            <FrequenceBadge value={item.frequence} />
            <Text size="lg" numberOfLines={1}>
              {item.description}
            </Text>
          </Box>
          <Box className="mr-2 items-end">
            <Text size="sm" className="text-typography-500">
              {formatDate(item.startAt)}
            </Text>
            <Text size="lg" className="font-medium">
              {formatAmount(item.amount)}
            </Text>
          </Box>
        </Pressable>
      </Swipeable>

      {open && (
        <Portal isOpen>
          <View className="flex-1 items-center justify-center p-4">
            <Animated.View
              className="absolute top-0 left-0 bg-background-0/50"
              style={{ width, height }}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Pressable onPress={toggleDetails} className="flex-1" />
            </Animated.View>

            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              className="absolute left-4 w-full"
              style={modalStyle}
            >
              <Card contentClassName="gap-2">
                <Box className="flex-row items-end justify-between gap-4">
                  <Box className="flex-1 items-start">
                    <FrequenceBadge value={item.frequence} />
                    <Text size="lg" numberOfLines={1}>
                      {item.description}
                    </Text>
                  </Box>
                  <Box className="items-end">
                    <Text size="sm" className="text-typography-500">
                      {formatDate(item.startAt)}
                    </Text>
                    <Text size="lg" className="font-medium">
                      {formatAmount(item.amount)}
                    </Text>
                  </Box>
                </Box>
                <Divider />

                <Box className="flex-row items-center justify-between">
                  <Text>Iniciado em </Text>
                  <Text className="font-bold">{formatDate(item.startAt)}</Text>
                </Box>
                <Box className="flex-row items-center justify-between">
                  <Text>Finalizada em </Text>
                  <Text className="font-bold">Sem prazo</Text>
                </Box>
                <Box className="flex-row items-center justify-between">
                  <Text>Proxíma registro</Text>
                  <Text className="font-bold">XX</Text>
                </Box>
                <Divider />

                <Box className="mt-2 flex-row items-center justify-stretch gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onPress={toggleDetails}
                  >
                    <ButtonIcon as={XIcon} />
                    <ButtonText>Fechar</ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    action="negative"
                    className="flex-1"
                    onPress={handleDelete}
                  >
                    <ButtonIcon as={Trash2Icon} />
                    <ButtonText>Deletar</ButtonText>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ButtonIcon as={Edit3Icon} />
                    <ButtonText>Editar</ButtonText>
                  </Button>
                </Box>
              </Card>
            </Animated.View>
          </View>
        </Portal>
      )}
    </View>
  )
}
