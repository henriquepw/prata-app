import { Link } from "expo-router"
import { useTransactions } from "~/features/transaction/store/transation"
import { Box } from "~/shared/components/box"
import { Button, ButtonText } from "~/shared/components/button"
import { Skeleton } from "~/shared/components/skeleton"
import { Text } from "~/shared/components/text"
import { TransationCard } from "./transation-card"

export function TransactionLastList() {
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

      {transations.data?.items.length ? (
        <Link asChild href="/transations">
          <Button className="mx-auto mt-6" variant="link" action="secondary">
            <ButtonText>Ver mais</ButtonText>
          </Button>
        </Link>
      ) : (
        <Text className="text-center">Nenhuma movimentação registrada</Text>
      )}
    </Box>
  )
}
