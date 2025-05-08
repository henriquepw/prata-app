import { Link } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"

interface PointProps {
  title: string
  children: string
}
function Point({ title, children }: PointProps) {
  return (
    <>
      <Box className="mt-6 mb-0.5 flex-row items-center gap-1">
        <Box className="size-3 items-center justify-center rounded-full bg-primary-500/50">
          <Box className="size-1 rounded-full bg-primary-500" />
        </Box>
        <Heading>{title}</Heading>
      </Box>
      <Text className="ml-4">{children}</Text>
    </>
  )
}

export default function IntroductionStartScreen() {
  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <Heading size="2xl" className="mb-6">
          Bem vindo
        </Heading>
        <View className="mb-2 h-1 w-10 rounded-full bg-primary-500" />
        <Text>
          Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor
          pellentesque in ornare sed sapien. Nam commodo consectetur egestas
          lacus massa eget. Tristique hac non in elementum. Elit pharetra nibh
          aliquet ut nulla in.
        </Text>

        <Point title="Básico">
          Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor
          pellentesque.
        </Point>
        <Point title="Poupança">
          Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor
          pellentesque.
        </Point>
        <Point title="Livre">
          Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor
          pellentesque.
        </Point>

        <Link asChild href="/intro/income">
          <Button className="mt-auto ml-auto">
            <ButtonText>Avançar</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </Link>
      </SafeAreaView>
    </Background>
  )
}
