import { Text as T } from "react-native"
import { cn } from "~/src/utils/cn"

type Props = {
  children?: React.ReactNode
  className?: string
}
export function Text({ children, className }: Props) {
  return (
    <T className={cn("text-primary-12 dark:text-primarydark-12", className)}>
      {children}
    </T>
  )
}
