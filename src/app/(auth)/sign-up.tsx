import { useSignUp } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import { KeyboardAvoidingView, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonText } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { useAppForm } from "~/components/ui/form"
import { InputRef } from "~/components/ui/form/fields/input"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"

const signUpSchema = z
  .object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(3, { message: "O nome é obrigatório" })
      .trim(),
    email: z
      .string({ message: "O email é obrigatório" })
      .email("Deve ser um email válido"),
    password: z
      .string({ message: "A senha é obrigatória" })
      .min(8, "Deve ter ao menos 8 caracteres"),
    confirmPassword: z
      .string({ message: "A confirmação da senha é obrigatória" })
      .min(8, "Deve ter ao menos 8 caracteres"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    path: ["confirmPassword"],
    message: "A confirmação deve ser igual a senha",
  })

const verifySchema = z.object({
  code: z.string({ message: "O código de verificação é obrigatório" }).trim(),
})

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const nameRef = useRef<InputRef>(null)
  const emailRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)
  const confirmPasswordRef = useRef<InputRef>(null)

  const [pendingVerification, setPendingVerification] = useState(false)

  const signUpform = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      if (!isLoaded) return

      try {
        await signUp.create({
          emailAddress: value.email,
          password: value.password,
          username: value.name,
        })

        await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        setPendingVerification(true)
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        console.error(JSON.stringify(err, null, 2))
      }
    },
  })

  const verifyForm = useAppForm({
    defaultValues: {
      code: "",
    },
    validators: {
      onSubmit: verifySchema,
    },
    onSubmit: async ({ value }) => {
      if (!isLoaded) return

      try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code: value.code,
        })

        if (signUpAttempt.status !== "complete") {
          console.error(JSON.stringify(signUpAttempt, null, 2))
          return
        }

        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace("/introduction/start")
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        console.error(JSON.stringify(err, null, 2))
      }
    },
  })

  if (pendingVerification) {
    return (
      <Background>
        <SafeAreaView className="justify-center">
          <StatusBar style="light" />
          <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
              <Card className="my-auto">
                <Heading>Verifique seu email</Heading>
                <verifyForm.AppField name="code">
                  {(field) => (
                    <field.Input
                      isRequired
                      label="Código"
                      textContentType="oneTimeCode"
                      placeholder="Digite o código que enviamos para seu email"
                      returnKeyType="done"
                      onSubmitEditing={verifyForm.handleSubmit}
                    />
                  )}
                </verifyForm.AppField>
                <Box className="gap-4">
                  <verifyForm.AppForm>
                    <verifyForm.SubmitButton>Verificar</verifyForm.SubmitButton>
                  </verifyForm.AppForm>
                  <Button
                    variant="link"
                    onPress={() => setPendingVerification(false)}
                  >
                    <ButtonText>Voltar</ButtonText>
                  </Button>
                </Box>
              </Card>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Background>
    )
  }

  return (
    <Background>
      <SafeAreaView className="justify-center">
        <StatusBar style="light" />
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
            <Card className="my-auto">
              <Heading>Cadastrar no Pobrin</Heading>
              <signUpform.AppField name="name">
                {(field) => (
                  <field.Input
                    ref={nameRef}
                    isRequired
                    label="Nome"
                    autoCorrect={false}
                    autoCapitalize="words"
                    textContentType="givenName"
                    placeholder="Como gosta de ser chamado"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                  />
                )}
              </signUpform.AppField>
              <signUpform.AppField name="email">
                {(field) => (
                  <field.Input
                    ref={emailRef}
                    isRequired
                    label="E-mail"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="exemplo@email.com"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                )}
              </signUpform.AppField>
              <signUpform.AppField name="password">
                {(field) => (
                  <field.Input
                    ref={passwordRef}
                    isRequired
                    label="Senha"
                    type="password"
                    textContentType="password"
                    placeholder="Senha ULTRA segura (ou não)"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  />
                )}
              </signUpform.AppField>
              <signUpform.AppField name="confirmPassword">
                {(field) => (
                  <field.Input
                    ref={confirmPasswordRef}
                    isRequired
                    label="Confirmação da Senha"
                    type="password"
                    submitBehavior="submit"
                    textContentType="password"
                    placeholder="A mesma senha de cima"
                    returnKeyType="done"
                    onSubmitEditing={signUpform.handleSubmit}
                  />
                )}
              </signUpform.AppField>
              <Box className="mt-4">
                <signUpform.AppForm>
                  <signUpform.SubmitButton>Cadastrar</signUpform.SubmitButton>
                </signUpform.AppForm>
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
