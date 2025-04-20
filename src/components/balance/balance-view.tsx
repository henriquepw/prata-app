import { Text } from "react-native"
import { useBalance } from "~/store/balance-store"
import { Skeleton } from "../ui/skeleton"

export function BalanceView() {
  const balance = useBalance()

  if (balance.isPending) {
    return <Skeleton className="mx-auto aspect-square h-40 rounded-full" />
  }

  return <Text>TODO</Text>
}
