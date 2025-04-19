import { useSignIn } from "@clerk/clerk-expo"
import { useForm } from "@tanstack/react-form"
import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef } from "react"
import { KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonText } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input, InputRef } from "~/components/ui/form/input"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"

const schema = z.object({
  identifier: z.string(),
  password: z.string(),
})

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const emailRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      if (!isLoaded) return

      try {
        const signInAttempt = await signIn?.create(value)

        if (signInAttempt?.status !== "complete") {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2))
          return
        }

        await setActive?.({ session: signInAttempt.createdSessionId })
        router.replace("/")
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        console.error(JSON.stringify(err, null, 2))
      }
    },
  })

  return (
    <Background asChild>
      <SafeAreaView className="justify-center p-6">
        <StatusBar style="light" />
        <KeyboardAvoidingView>
          <Card>
            <Heading>Bem vindo!</Heading>
            <form.Field name="identifier">
              {(field) => (
                <Input
                  isRequired
                  autoFocus
                  autoCorrect={false}
                  autoComplete="email"
                  autoCapitalize="none"
                  label="E-mail"
                  textContentType="emailAddress"
                  placeholder="exemplo@email.com"
                  returnKeyType="next"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  errors={field.state.meta.errors}
                  isDirty={field.state.meta.isDirty}
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <Input
                  ref={passwordRef}
                  isRequired
                  label="Senha"
                  type="password"
                  textContentType="password"
                  placeholder="Sua senha ULTRA segura (ou não)"
                  returnKeyType="done"
                  onSubmitEditing={() => form.handleSubmit}
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  errors={field.state.meta.errors}
                  isDirty={field.state.meta.isDirty}
                />
              )}
            </form.Field>

            <Box className="mt-4">
              <Button onPress={form.handleSubmit}>
                <ButtonText>
                  {form.state.isSubmitting ? "Entrando..." : "Entrar"}
                </ButtonText>
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
