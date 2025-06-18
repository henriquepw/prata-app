import type { ListRenderItemInfo } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated"
import { RecurrenceItem } from "~/shared/components/features/recurrences/recurrence-item"
import { Box } from "~/shared/components/ui/box"
import { Card } from "~/shared/components/ui/card"
import { Heading } from "~/shared/components/ui/heading"
import { ScreenRoot } from "~/shared/components/ui/layouts/screen"
import { Selector, SelectorItem } from "~/shared/components/ui/selector"
import { Text } from "~/shared/components/ui/text"
import {
  type Recurrence,
  useReccurences,
  useSetRecurrencesParams,
} from "~/shared/store/slices/recurrence"
import { TransactionType } from "~/shared/store/slices/transation"
import { cn } from "~/shared/utils/cn"

const panGesture = Gesture.Pan()

type CellProps = {
  className?: string
  children: React.ReactNode
}
function Cell({ children, className }: CellProps) {
  return <Box className={cn("flex-1 items-start", className)}>{children}</Box>
}

function Separetor() {
  return <Box className="h-[1px] bg-outline-100" />
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
  return <RecurrenceItem item={item} />
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

      <GestureDetector gesture={panGesture}>
        <Animated.FlatList
          data={items}
          entering={FadeInUp}
          exiting={FadeOutDown}
          ItemSeparatorComponent={Separetor}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={Empty}
          ListHeaderComponent={Header}
          onRefresh={() => !query.isFetching && query.refetch()}
          refreshing={query.isRefetching}
          renderItem={Row}
        />
      </GestureDetector>
    </ScreenRoot>
  )
}
