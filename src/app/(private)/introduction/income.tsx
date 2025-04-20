import { Link } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"

export default function IntroductionIncomeScreen() {
  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <Heading size="2xl" className="mb-6">
          Renda
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor
          pellentesque in ornare sed sapien. Nam commodo consectetur egestas
          lacus massa eget. Tristique hac non in elementum. Elit pharetra nibh
          aliquet ut nulla in.
        </Text>

        <Link asChild href="/introduction/balance">
          <Button className="mt-auto ml-auto">
            <ButtonText>Próximo</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </Link>
      </SafeAreaView>
    </Background>
  )
}
