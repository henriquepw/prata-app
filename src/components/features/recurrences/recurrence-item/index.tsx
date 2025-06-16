import { Link } from "expo-router"
import { Edit3Icon, Trash2Icon } from "lucide-react-native"
import { useEffect, useRef } from "react"
import { Alert, Pressable, View, useWindowDimensions } from "react-native"
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable"
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Divider } from "~/components/ui/divider"
import { Portal } from "~/components/ui/portal"
import { Text } from "~/components/ui/text"
import { useToggle } from "~/hooks/use-toggle"
import { Recurrence, useDeleteRecurrence } from "~/store/slices/recurrence"
import { formatAmount } from "~/utils/format-amount"
import { formatDate } from "~/utils/format-date"
import { FrequenceBadge } from "../frequance-badge"
import { RecurrenceCard } from "./card"
import { RecurrenceSwipe } from "./swipe"

type Props = {
  item: Recurrence
}
export function RecurrenceItem({ item }: Props) {
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

  const modalStyle = useAnimatedStyle(() => ({
    top: top.value,
  }))

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

  return (
    <View ref={rootRef}>
      <RecurrenceSwipe onDelete={handleDelete}>
        <RecurrenceCard item={item} onPress={toggleDetails} />
      </RecurrenceSwipe>

      {open && (
        <Portal isOpen>
          <View className="flex-1 items-center justify-center p-4">
            <Animated.View
              className="absolute top-0 left-0 bg-background-0/40"
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
                    action="negative"
                    className="flex-1"
                    onPress={handleDelete}
                  >
                    <ButtonIcon as={Trash2Icon} />
                    <ButtonText>Deletar</ButtonText>
                  </Button>
                  <Link
                    asChild
                    href={`/recurrences/${item.id}`}
                    onPressOut={toggleDetails}
                  >
                    <Button size="sm" className="flex-1">
                      <ButtonIcon as={Edit3Icon} />
                      <ButtonText>Editar</ButtonText>
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Animated.View>
          </View>
        </Portal>
      )}
    </View>
  )
}
