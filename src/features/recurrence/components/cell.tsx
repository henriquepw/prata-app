import { Box } from "~/shared/components/box"
import { cn } from "~/shared/utils/cn"

type Props = {
  className?: string
  children: React.ReactNode
}

export function Cell({ children, className }: Props) {
  return <Box className={cn("flex-1 items-start", className)}>{children}</Box>
}
