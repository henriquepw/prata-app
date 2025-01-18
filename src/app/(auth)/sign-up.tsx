import { Box } from "@ui/box"
import { Button, ButtonText } from "@ui/button"
import { Heading } from "@ui/heading"
import { Text } from "@ui/text"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Input } from "~/components/ui/form/input"
import { cssInterop } from "nativewind"
import { StatusBar } from "expo-status-bar"
import { Card } from "@ui/card"

cssInterop(LinearGradient, { className: "style" })

export default function SignUpPage() {
  function createAccount() {
    // TODO:
  }

  return (
    <SafeAreaView className="flex-1 justify-center bg-background-0 p-6">
      <StatusBar style="light" />
      <KeyboardAvoidingView>
        <Card>
          <Heading>Cadastrar no Pobrin</Heading>
          <Input
            isRequired
            label="Nome"
            textContentType="givenName"
            placeholder="Como gosta de ser chamado"
          />
          <Input
            isRequired
            label="E-mail"
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
            <Button onPress={createAccount}>
              <ButtonText>Cadastrar</ButtonText>
            </Button>
            <Box className="mt-2 flex-row items-center justify-center gap-2">
              <Text>Já possui uma conta?</Text>
              <Link
                href="/(auth)/sign-in"
                className="text-primary-600 underline"
              >
                Entrar
              </Link>
            </Box>
          </Box>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
