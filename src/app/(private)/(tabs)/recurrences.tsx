import { ListRenderItemInfo } from "react-native"
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler"
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated"
import { RecurrenceCard } from "~/components/features/recurrences/recurrence-card"
import { Box } from "~/components/ui/box"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"
import { ScreenRoot } from "~/components/ui/layouts/screen"
import { Selector, SelectorItem } from "~/components/ui/selector"
import { Text } from "~/components/ui/text"
import {
  Recurrence,
  useReccurences,
  useSetRecurrencesParams,
} from "~/store/slices/recurrence"
import { TransactionType } from "~/store/slices/transation"
import { cn } from "~/utils/cn"

const panGesture = Gesture.Pan()

type CellProps = {
  className?: string
  children: React.ReactNode
}
function Cell({ children, className }: CellProps) {
  return <Box className={cn("flex-1 items-start", className)}>{children}</Box>
}

function Separetor() {
  return <Box className="my-2 h-[1px] bg-outline-100" />
}

function Empty() {
  return (
    <Card>
      <Text>Nenhuma recorrência cadastrado</Text>
    </Card>
  )
}

function Header() {
  return (
    <Box className="mb-2 flex-row gap-4">
      <Cell className="ml-2">
        <Text className="font-medium text-typography-500">DESCRIÇÃO</Text>
      </Cell>
      <Cell className="mr-2 items-end">
        <Text className="font-medium text-typography-500">VALOR</Text>
      </Cell>
    </Box>
  )
}

function Row({ item }: ListRenderItemInfo<Recurrence>) {
  return <RecurrenceCard item={item} />
}

export default function RecurrentListPage() {
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

      <GestureHandlerRootView>
        <GestureDetector gesture={panGesture}>
          <Animated.FlatList
            entering={FadeInUp}
            exiting={FadeOutDown}
            data={items}
            keyExtractor={(item) => item.id}
            refreshing={query.isRefetching}
            onRefresh={() => !query.isFetching && query.refetch()}
            ListEmptyComponent={Empty}
            ListHeaderComponent={Header}
            ItemSeparatorComponent={Separetor}
            renderItem={Row}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </ScreenRoot>
  )
}
