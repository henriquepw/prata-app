import { Box } from "~/components/ui/box"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { cn } from "~/utils/cn"

type Props = {
  title: string
  subtitle?: string
  className?: string
}
export function IntroHeader({ title, subtitle, className }: Props) {
  return (
    <Box className={cn("mb-4", className)}>
      <Heading size="2xl" className="mb-6">
        {title}
      </Heading>
      <Box className="mb-2 h-1 w-10 rounded-full bg-primary-500" />
      <Text size="lg">{subtitle}</Text>
    </Box>
  )
}
