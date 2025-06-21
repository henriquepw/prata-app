import { useEffect, useRef } from "react"
import { Alert, View } from "react-native"
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable"
import { useSharedValue } from "react-native-reanimated"
import type { Recurrence } from "~/features/recurrence/store/types"
import { useBoolean } from "~/shared/hooks/use-boolean"
import { useDeleteRecurrence } from "../../store/delete-recurrence"
import { RecurrenceDetail } from "../detail-modal"
import { RecurrenceCard } from "./card"
import { RecurrenceSwipe } from "./swipe"

type Props = {
  item: Recurrence
}
export function RecurrenceItem({ item }: Props) {
  const deleteRecurrence = useDeleteRecurrence()
  const [isOpen, openDetail, closeDetail] = useBoolean()

  const swipeRef = useRef<SwipeableMethods>(null)
  const rootRef = useRef<View>(null)
  const top = useSharedValue(0)
  useEffect(() => {
    rootRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      top.value = pageY
    })
  }, [top])

  const handleDelete = () => {
    Alert.alert("Tem certeza que deseja deletar essa recorrência?", undefined, [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => swipeRef.current?.close(),
      },
      {
        isPreferred: true,
        text: "Deletar",
        style: "destructive",
        onPress: () => {
          deleteRecurrence.mutate(item.id)
          closeDetail()
        },
      },
    ])
  }

  return (
    <View ref={rootRef}>
      <RecurrenceSwipe onDelete={handleDelete} ref={swipeRef}>
        <RecurrenceCard item={item} onPress={openDetail} />
      </RecurrenceSwipe>
      <RecurrenceDetail
        isOpen={isOpen}
        item={item}
        onClose={closeDetail}
        onDelete={() => swipeRef.current?.openRight()}
        top={top}
      />
    </View>
  )
}
