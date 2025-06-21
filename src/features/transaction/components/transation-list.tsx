import { useTransactions } from "~/features/transaction/store/transation"
import { Box } from "~/shared/components/box"
import { Skeleton } from "~/shared/components/skeleton"
import { Text } from "~/shared/components/text"
import { TransationCard } from "./transation-card"

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
