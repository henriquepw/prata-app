import { Link } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { View } from "react-native"
import { Background } from "~/components/background"
import { Box } from "~/components/box"
import { Button, ButtonIcon, ButtonText } from "~/components/button"
import { Heading } from "~/components/heading"
import { Text } from "~/components/text"
import { IntroHeader } from "../components/intro-header"

type PointProps = {
  title: string
  children: string
}
function Point({ title, children }: PointProps) {
  return (
    <>
      <Box className="mt-6 mb-0.5 flex-row items-center gap-1">
        <Box className="bg-primary/50 size-3 items-center justify-center rounded-full">
          <Box className="bg-primary size-1 rounded-full" />
        </Box>
        <Heading>{title}</Heading>
      </Box>
      <Text className="ml-4">{children}</Text>
    </>
  )
}

export default function StartIntroductionScreen() {
  return (
    <Background>
      <View className="flex-1 p-6">
        <IntroHeader
          subtitle="Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor pellentesque in ornare sed sapien. Nam commodo consectetur egestas lacus massa eget. Tristique hac non in elementum. Elit pharetra nibh aliquet ut nulla in."
          title="Bem vindo"
        />

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

        <Link asChild href="/">
          <Button className="mt-auto ml-auto">
            <ButtonText>Avançar</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </Link>
      </View>
    </Background>
  )
}
