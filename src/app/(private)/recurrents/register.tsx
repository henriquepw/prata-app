import { useNavigation } from "expo-router"
import { ChevronLeftIcon, SaveIcon } from "lucide-react-native"
import { Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Input } from "~/components/ui/form/fields/input"
import { Heading } from "~/components/ui/heading"
import { Icon } from "~/components/ui/icon"

export default function RegisterRecurrentPage() {
  const navigation = useNavigation()

  return (
    <Background>
      <SafeAreaView className="gap-6 p-4">
        <Box className="h-12 flex-row items-center justify-between gap-2">
          <Pressable
            className="size-10 items-start justify-center active:opacity-50"
            onPress={navigation.goBack}
          >
            <Icon as={ChevronLeftIcon} size="xl" />
          </Pressable>
          <Heading size="2xl" className="flex-1">
            Nova Recorrência
          </Heading>
        </Box>
        <Box className="gap-4">
          <Input isRequired label="Descrição" />
          <Input isRequired label="Descrição" />
          <Input isRequired label="Descrição" />
          <Input isRequired label="Descrição" />

          <Button className="ml-auto">
            <ButtonIcon as={SaveIcon} />
            <ButtonText>Registrar</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </Background>
  )
}
