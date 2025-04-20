import { ChevronRightIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"

export default function IntroductionStartScreen() {
  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <Heading>Bem vindo</Heading>
        <Button className="mt-auto ml-auto">
          <ButtonText>Próximo</ButtonText>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
      </SafeAreaView>
    </Background>
  )
}
