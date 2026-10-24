import { cn } from "~/lib/cn"
import { Text } from "../text"

type Props = {
  className?: string
}
export function MoneyPrefix({ className }: Props) {
  return (
    <Text className={cn("text-primary text-xl font-bold", className)}>R$</Text>
  )
}
