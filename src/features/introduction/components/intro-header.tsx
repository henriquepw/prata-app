import { Box } from "~/shared/components/box"
import { Heading } from "~/shared/components/heading"
import { Text } from "~/shared/components/text"
import { cn } from "~/shared/utils/cn"

type Props = {
  title: string
  subtitle?: string
  className?: string
}
export function IntroHeader({ title, subtitle, className }: Props) {
  return (
    <Box className={cn("mb-4", className)}>
      <Heading className="mb-6" size="2xl">
        {title}
      </Heading>
      <Box className="mb-2 h-1 w-10 rounded-full bg-primary-500" />
      <Text size="lg">{subtitle}</Text>
    </Box>
  )
}
