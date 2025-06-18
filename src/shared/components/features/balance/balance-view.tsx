import { Text } from "react-native"
import { Skeleton } from "~/shared/components/ui/skeleton"
import { useBalance } from "~/shared/store/slices/balance"

export function BalanceView() {
  const balance = useBalance()

  if (balance.isPending) {
    return <Skeleton className="mx-auto aspect-square h-40 rounded-full" />
  }

  return <Text>TODO</Text>
}
