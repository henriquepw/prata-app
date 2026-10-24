import { Box } from "~/components/box"
import { Heading } from "~/components/heading"
import { Text } from "~/components/text"
import { cn } from "~/lib/cn"

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
      <Box className="bg-primary mb-2 h-1 w-10 rounded-full" />
      <Text size="lg">{subtitle}</Text>
    </Box>
  )
}
