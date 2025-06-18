import { cn } from "~/shared/utils/cn"
import { Text } from "../text"

type Props = {
  className?: string
}
export function MoneyPrefix({ className }: Props) {
  return (
    <Text className={cn("font-bold text-primary-500 text-xl", className)}>
      R$
    </Text>
  )
}
