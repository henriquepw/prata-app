import { useBalance } from "~/store/balance-store"
import { Skeleton } from "../ui/skeleton"

export function BalanceView() {
  const balance = useBalance()
  //
  // if (balance.isPending) {
  //   return <Skeleton />
  // }

  return <Skeleton className="rounded-full size-10" />
}
