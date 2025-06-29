import { Link } from "expo-router"
import { useRef } from "react"
import { KeyboardAvoidingView } from "react-native"
import { z } from "zod"
import { useSignIn } from "~/features/auth/store/auth"
import { Box } from "~/shared/components/box"
import { Card } from "~/shared/components/card"
import { useAppForm } from "~/shared/components/form"
import type { InputRef } from "~/shared/components/form/fields/input"
import { Heading } from "~/shared/components/heading"
import { ScreenRoot } from "~/shared/components/layouts/screen"
import { Text } from "~/shared/components/text"

const schema = z.object({
  identifier: z
    .string({ required_error: "O email é obrigatório" })
    .email("Deve ser um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
})

export function SignInScreen() {
  const signIn = useSignIn()
  const passwordRef = useRef<InputRef>(null)

  const form = useAppForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    validators: {
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
    <ScreenRoot className="justify-center">
      <KeyboardAvoidingView>
        <Card>
          <Heading>Bem vindo!</Heading>
          <form.AppField name="identifier">
            {(field) => (
              <field.Input
                isRequired
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                label="E-mail"
                placeholder="exemplo@email.com"
                returnKeyType="next"
                textContentType="emailAddress"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.Input
                isRequired
                ref={passwordRef}
                label="Senha"
                type="password"
                placeholder="Sua senha ULTRA segura (ou não)"
                returnKeyType="done"
                textContentType="password"
                onSubmitEditing={form.handleSubmit}
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
    </ScreenRoot>
  )
}
