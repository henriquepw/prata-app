import { ChevronRightIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"

export default function IntroductionStartScreen() {
  return (
    <Background asChild>
      <SafeAreaView className="flex-1 p-6">
        <Button className="mt-auto ml-auto">
          <ButtonText>Próximo</ButtonText>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
      </SafeAreaView>
    </Background>
  )
}
