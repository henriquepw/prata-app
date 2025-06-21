import type { ListRenderItemInfo } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated"
import { RecurrenceItem } from "~/features/recurrence/components/recurrence-item"
import { TransactionType } from "~/features/transaction/store/transation"
import { Box } from "~/shared/components/box"
import { Heading } from "~/shared/components/heading"
import { ScreenRoot } from "~/shared/components/layouts/screen"
import { Selector, SelectorItem } from "~/shared/components/selector"
import { NoItem } from "../components/no-item"
import { Separetor } from "../components/separetor"
import {
  useReccurences,
  useSetRecurrencesParams,
} from "../store/list-recurrences"
import type { Recurrence } from "../store/types"

const panGesture = Gesture.Pan()

function Row({ item }: ListRenderItemInfo<Recurrence>) {
  return <RecurrenceItem item={item} />
}

export function RecurrentListScreen() {
  const setReccurencesParams = useSetRecurrencesParams()
  const [items, query] = useReccurences()

  return (
    <ScreenRoot>
      <Box className="mb-4 h-10 flex-row items-center justify-between gap-2">
        <Heading size="2xl">Fixos</Heading>
      </Box>

      <Selector
        className="mb-2"
        onChange={(type) =>
          setReccurencesParams({ type: type as TransactionType })
        }
      >
        <SelectorItem
          index={0}
          label="Entradas"
          value={TransactionType.INCOME}
        />
        <SelectorItem
          index={1}
          label="Saídas"
          value={TransactionType.OUTCOME}
        />
      </Selector>

      <GestureDetector gesture={panGesture}>
        <Animated.FlatList
          data={items}
          entering={FadeInUp}
          exiting={FadeOutDown}
          ItemSeparatorComponent={Separetor}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={NoItem}
          onRefresh={() => !query.isFetching && query.refetch()}
          refreshing={query.isRefetching}
          renderItem={Row}
        />
      </GestureDetector>
    </ScreenRoot>
  )
}
