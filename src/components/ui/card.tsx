import { View } from "react-native"
import { cn } from "~/src/utils/cn"

type Props = {
  children?: React.ReactNode
  className?: string
}
export function Card({ children, className }: Props) {
  return (
    <View
      className={cn(
        "rounded-xl border border-primarya-3 bg-primarya-2 p-4 dark:border-primarydarka-3 dark:bg-primarydarka-2",
        className,
      )}
    >
      {children}
    </View>
  )
}
