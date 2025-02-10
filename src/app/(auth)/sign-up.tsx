import { useForm } from "@tanstack/react-form"
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef } from "react"
import { KeyboardAvoidingView, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonSpinner, ButtonText } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input, InputRef } from "~/components/ui/form/input"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { useAccountStore } from "~/store/account-store"

const schema = z.object({
  name: z
    .string({ message: "O nome é obrigatório" })
    .min(3, { message: "O nome é obrigatório" })
    .trim(),
  email: z
    .string({ message: "O email é obrigatório" })
    .email("Deve ser um email válido"),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(6, "Deve ter ao menos 6 caracteres"),
  confirmPassword: z
    .string({ message: "A confirmação da senha é obrigatória" })
    .min(6, "Deve ter ao menos 6 caracteres"),
})

export default function SignUpPage() {
  const nameRef = useRef<InputRef>(null)
  const emailRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)
  const confirmPasswordRef = useRef<InputRef>(null)

  const signUp = useAccountStore((s) => s.signUp)
  const form = useForm({
    validators: {
      onBlur: schema,
    },
    onSubmit: async (payload) => {
      console.log({ payload })
      await signUp(payload.value)
    },
  })

  function submit() {
    console.log(form.state.errors)
    const hasError = form.state.errors.length > 0
    if (hasError) {
      // TODO:
      // Focus the input with error
      return
    }

    form.handleSubmit()
  }

  return (
    <Background asChild>
      <SafeAreaView className="justify-center">
        <StatusBar style="light" />
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
            <Card className="my-auto">
              <Heading>Cadastrar no Pobrin</Heading>
              <form.Field name="name">
                {(field) => (
                  <Input
                    ref={nameRef}
                    isRequired
                    label="Nome"
                    textContentType="givenName"
                    placeholder="Como gosta de ser chamado"
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
              <form.Field name="email">
                {(field) => (
                  <Input
                    ref={emailRef}
                    isRequired
                    label="E-mail"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="exemplo@email.com"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
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
                    placeholder="Senha ULTRA segura (ou não)"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    errors={field.state.meta.errors}
                    isDirty={field.state.meta.isDirty}
                  />
                )}
              </form.Field>
              <form.Field name="confirmPassword">
                {(field) => (
                  <Input
                    ref={confirmPasswordRef}
                    isRequired
                    label="Confirmação da Senha"
                    type="password"
                    submitBehavior="submit"
                    textContentType="password"
                    placeholder="A mesma senha de cima"
                    returnKeyType="done"
                    onSubmitEditing={() => confirmPasswordRef.current?.blur()}
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    onBlur={field.handleBlur}
                    errors={field.state.meta.errors}
                    isDirty={field.state.meta.isDirty}
                  />
                )}
              </form.Field>
              <Box className="mt-4">
                <Button isDisabled={form.state.isSubmitting} onPress={submit}>
                  {form.state.isSubmitting ? (
                    <>
                      <ButtonSpinner className="text-typography-50" />
                      <ButtonText>Cadastrando...</ButtonText>
                    </>
                  ) : (
                    <ButtonText>Cadastrar</ButtonText>
                  )}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  )
}
