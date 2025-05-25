import { Box } from "~/components/ui/box"
import { Skeleton } from "~/components/ui/skeleton"
import { useTransactions } from "~/store/slices/transation"
import { TransationCard } from "./transation-card"
import { Text } from "~/components/ui/text"

export function TransactionList() {
  const transations = useTransactions()

  if (transations.isPending) {
    return (
      <Box className="gap-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </Box>
    )
  }

  return (
    <Box className="gap-4">
      {transations.data?.items.map((item) => (
        <TransationCard key={item.id} transaction={item} />
      ))}

      {!transations.data?.items.length && (
        <Text className="text-center">Nenhuma movimentação registrada</Text>
      )}
    </Box>
  )
}
