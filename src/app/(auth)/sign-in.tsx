import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonText } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input } from "~/components/ui/form/input"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { useAccountStore } from "~/store/account-store"

export default function SignUpPage() {
  const signIn = useAccountStore((s) => s.signIn)

  // TODO:
  async function login() {
    try {
      await signIn({
        email: "",
        password: "",
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Background asChild>
      <SafeAreaView className="justify-center p-6">
        <StatusBar style="light" />
        <KeyboardAvoidingView>
          <Card>
            <Heading>Bem vindo!</Heading>
            <Input
              label="E-mail"
              isRequired
              textContentType="emailAddress"
              placeholder="exemplo@email.com"
            />
            <Input
              isRequired
              label="Senha"
              type="password"
              textContentType="password"
              placeholder="Senha ULTRA segura (ou não)"
            />
            <Box className="mt-4">
              <Button onPress={login}>
                <ButtonText>Entrar</ButtonText>
              </Button>
              <Box className="mt-2 flex-row items-center justify-center gap-2">
                <Text>Não possui uma conta?</Text>
                <Link
                  href="/(auth)/sign-up"
                  className="text-primary-600 underline"
                >
                  Cadastrar
                </Link>
              </Box>
            </Box>
          </Card>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  )
}
