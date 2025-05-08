import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef } from "react"
import { KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Card } from "~/components/ui/card"
import { useAppForm } from "~/components/ui/form"
import { InputRef } from "~/components/ui/form/fields/input"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { useSignIn } from "~/store/auth-store"

const schema = z.object({
  identifier: z
    .string({ required_error: "O email é obrigatório" })
    .email("Deve ser um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
})

export default function SignInPage() {
  const signIn = useSignIn()
  const emailRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)

  const form = useAppForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    validators: {
      onChange: schema,
      onSubmit: schema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await signIn.mutateAsync({
          email: value.identifier,
          password: value.password,
        })
      } catch (err) {
        formApi.setErrorMap({
          onSubmit: () => ({
            password: "Email e/ou senha inválido",
          }),
        })
        // See https://clerk.com/docs/custom-flows/error-handling
        console.error(JSON.stringify(err, null, 2))
      }
    },
  })

  return (
    <Background>
      <SafeAreaView className="justify-center p-6">
        <StatusBar style="light" />
        <KeyboardAvoidingView>
          <Card>
            <Heading>Bem vindo!</Heading>
            <form.AppField name="identifier">
              {(field) => (
                <field.Input
                  isRequired
                  label="E-mail"
                  autoCorrect={false}
                  autoComplete="email"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  placeholder="exemplo@email.com"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              )}
            </form.AppField>
            <form.AppField name="password">
              {(field) => (
                <field.Input
                  ref={passwordRef}
                  isRequired
                  label="Senha"
                  type="password"
                  textContentType="password"
                  placeholder="Sua senha ULTRA segura (ou não)"
                  returnKeyType="done"
                  onSubmitEditing={() => form.handleSubmit}
                />
              )}
            </form.AppField>

            <Box className="mt-4">
              <form.AppForm>
                <form.SubmitButton>Entrar</form.SubmitButton>
              </form.AppForm>
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
