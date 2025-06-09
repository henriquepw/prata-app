import { useRouter } from "expo-router"
import { PlusIcon } from "lucide-react-native"
import { ListRenderItemInfo } from "react-native"
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated"
import { FrequenceBadge } from "~/components/features/recurrences/frequance-badge"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"
import { ScreenRoot } from "~/components/ui/layouts/screen"
import { Text } from "~/components/ui/text"
import { Recurrence, useReccurences } from "~/store/slices/recurrence"
import { cn } from "~/utils/cn"
import { formatAmount } from "~/utils/format-amount"

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
      <Cell>
        <Text className="font-medium">DESCRIÇÃO</Text>
      </Cell>
      <Cell className="items-end">
        <Text className="font-medium">VALOR</Text>
      </Cell>
    </Box>
  )
}

function Row({ item, index }: ListRenderItemInfo<Recurrence>) {
  return (
    <Animated.View
      className="flex-row items-end justify-between gap-4 py-2"
      entering={FadeInDown.delay(index * 50)}
      exiting={FadeInUp}
    >
      <Cell>
        <FrequenceBadge value={item.frequence} />
        <Text size="lg" numberOfLines={1} className="ml-2">
          {item.description}
        </Text>
      </Cell>
      <Box>
        <Text size="lg">{formatAmount(item.amount)}</Text>
      </Box>
    </Animated.View>
  )
}

export default function RecurrentListPage() {
  const [items, query] = useReccurences()
  const router = useRouter()

  return (
    <ScreenRoot>
      <Box className="mb-4 h-10 flex-row items-center justify-between gap-2">
        <Heading size="2xl">Recorrências</Heading>
        <Button
          size="sm"
          className="size-10"
          onPress={() => router.navigate("/recurrences/register")}
        >
          <ButtonIcon as={PlusIcon} />
        </Button>
      </Box>

      <Animated.FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshing={query.isRefetching}
        onRefresh={() => !query.isFetching && query.refetch()}
        ListEmptyComponent={Empty}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={Separetor}
        renderItem={Row}
        itemLayoutAnimation={LinearTransition}
      />
    </ScreenRoot>
  )
}
