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
        "rounded-xl border border-primary-4 bg-primary-3 p-4 dark:border-primarydark-4 dark:bg-primarydark-3",
        className,
      )}
    >
      {children}
    </View>
  )
}
