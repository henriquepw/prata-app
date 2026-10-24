import { Link } from "expo-router"
import { Box } from "~/components/box"
import { Button, ButtonText } from "~/components/button"
import { Skeleton } from "~/components/skeleton"
import { Text } from "~/components/text"
import { useTransactions } from "~/features/transaction/store/transation"
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
          <Button
            size="lg"
            variant="link"
            action="secondary"
            className="mx-auto"
          >
            <ButtonText>Ver mais</ButtonText>
          </Button>
        </Link>
      ) : (
        <Text className="text-center">Nenhuma movimentação registrada</Text>
      )}
    </Box>
  )
}
