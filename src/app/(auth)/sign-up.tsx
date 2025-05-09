import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useRef } from "react"
import { KeyboardAvoidingView, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Card } from "~/components/ui/card"
import { useAppForm } from "~/components/ui/form"
import { InputRef } from "~/components/ui/form/fields/input"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { useSignUp } from "~/store/auth/sign-up"

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

export default function SignUpPage() {
  const signUp = useSignUp()

  const nameRef = useRef<InputRef>(null)
  const emailRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)
  const confirmPasswordRef = useRef<InputRef>(null)

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
      try {
        await signUp.mutateAsync({
          username: value.name,
          email: value.email,
          password: value.password,
        })
      } catch (err) {
        console.error(err)
      }
    },
  })

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
