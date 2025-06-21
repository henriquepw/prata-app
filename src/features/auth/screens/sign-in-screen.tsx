import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef } from "react"
import { KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { useSignIn } from "~/features/auth/store/auth"
import { Background } from "~/shared/components/background"
import { Box } from "~/shared/components/box"
import { Card } from "~/shared/components/card"
import { useAppForm } from "~/shared/components/form"
import type { InputRef } from "~/shared/components/form/fields/input"
import { Heading } from "~/shared/components/heading"
import { Text } from "~/shared/components/text"

const schema = z.object({
  identifier: z
    .string({ required_error: "O email é obrigatório" })
    .email("Deve ser um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
})

export function SignInScreen() {
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
    onSubmit: async ({ value }) => {
      try {
        await signIn.mutateAsync({
          email: value.identifier,
          password: value.password,
        })
      } catch (err) {
        console.error(err)
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
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  isRequired
                  label="E-mail"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  placeholder="exemplo@email.com"
                  returnKeyType="next"
                  textContentType="emailAddress"
                />
              )}
            </form.AppField>
            <form.AppField name="password">
              {(field) => (
                <field.Input
                  isRequired
                  label="Senha"
                  onSubmitEditing={() => form.handleSubmit}
                  placeholder="Sua senha ULTRA segura (ou não)"
                  ref={passwordRef}
                  returnKeyType="done"
                  textContentType="password"
                  type="password"
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
                  className="text-primary-600 underline"
                  href="/(auth)/sign-up"
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
