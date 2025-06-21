import { Text } from "react-native"
import { useBalance } from "~/features/balance/store/balance"
import { Skeleton } from "~/shared/components/skeleton"

export function BalanceView() {
  const balance = useBalance()

  if (balance.isPending) {
    return <Skeleton className="mx-auto aspect-square h-40 rounded-full" />
  }

  return <Text>TODO</Text>
}
