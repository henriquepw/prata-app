import { Text } from "react-native"
import { Skeleton } from "~/components/ui/skeleton"
import { useBalance } from "~/store/balance-store"

export function BalanceView() {
  const balance = useBalance()

  if (balance.isPending) {
    return <Skeleton className="mx-auto aspect-square h-40 rounded-full" />
  }

  return <Text>TODO</Text>
}
