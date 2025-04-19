import { useSignUp } from "@clerk/clerk-expo"
import { useForm } from "@tanstack/react-form"
import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
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

const schema = z
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

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const nameRef = useRef<InputRef>(null)
  const emailRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)
  const confirmPasswordRef = useRef<InputRef>(null)

  const [pendingVerification, setPendingVerification] = useState(false)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: schema,
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

  const submit = () => {
    console.log(form.state.errors)
    const hasError = form.state.errors.length > 0
    if (hasError) {
      // TODO:
      // Focus the input with error
      return
    }

    form.handleSubmit()
  }

  const [code, setCode] = useState("")
  const verifyCode = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status !== "complete") {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        return
      }

      await setActive({ session: signUpAttempt.createdSessionId })
      router.replace("/")
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <Background asChild>
        <SafeAreaView className="justify-center">
          <StatusBar style="light" />
          <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
              <Card className="my-auto">
                <Heading>Verifique seu email</Heading>
                <Input
                  isRequired
                  label="Código"
                  textContentType="oneTimeCode"
                  placeholder="Digite o código que enviamos para seu email"
                  returnKeyType="done"
                  onChangeText={(code) => setCode(code)}
                  onSubmitEditing={verifyCode}
                />
                <Box className="gap-4">
                  <Button onPress={verifyCode}>
                    <ButtonText>Verificar</ButtonText>
                  </Button>
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
                    autoCorrect={false}
                    autoCapitalize="words"
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
                    autoCorrect={false}
                    autoCapitalize="none"
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
