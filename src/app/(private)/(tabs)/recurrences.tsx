import { Link } from "expo-router"
import { PlusIcon } from "lucide-react-native"
import Animated from "react-native-reanimated"
import { FrequenceBadge } from "~/components/features/recurrences/frequance-badge"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Heading } from "~/components/ui/heading"
import { ScreenRoot } from "~/components/ui/layouts/screen"
import { Text } from "~/components/ui/text"
import { useReccurences } from "~/store/slices/recurrence"
import { formatAmount } from "~/utils/format-amount"

export default function RecurrentListPage() {
  const [items, query] = useReccurences()

  return (
    <ScreenRoot>
      <Box className="mb-4 h-10 flex-row items-center justify-between gap-2">
        <Heading size="2xl">Recorrências</Heading>
        <Link asChild href="/recurrences/register">
          <Button size="sm" className="size-10">
            <ButtonIcon as={PlusIcon} />
          </Button>
        </Link>
      </Box>

      <Animated.FlatList
        data={items}
        keyExtractor={(item) => item.id}
        refreshing={query.isRefetching}
        onRefresh={() => !query.isFetching && query.refetch()}
        ListEmptyComponent={() => <Card>Nenhuma recorrência cadastrado</Card>}
        ListHeaderComponent={() => (
          <Box className="mb-2 flex-row justify-around gap-4">
            <Text className="font-medium">Frequência</Text>
            <Text className="flex-1 font-medium">Recorrências</Text>
            <Text className="font-medium">Valor</Text>
          </Box>
        )}
        ItemSeparatorComponent={() => (
          <Box className="my-2 h-[1px] bg-outline-100" />
        )}
        renderItem={({ item }) => (
          <Box className="flex-row items-end justify-between gap-10 py-2">
            <FrequenceBadge value={item.frequence} />
            <Text size="lg" numberOfLines={1} className="flex-1">
              {item.description}
            </Text>
            <Text size="lg" className="font-bold">
              {formatAmount(item.amount)}
            </Text>
          </Box>
        )}
      />
    </ScreenRoot>
  )
}
