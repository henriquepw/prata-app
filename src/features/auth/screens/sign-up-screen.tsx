import { Link } from "expo-router"
import { useRef } from "react"
import { KeyboardAvoidingView, ScrollView } from "react-native"
import { z } from "zod"
import { useSignUp } from "~/features/auth/store/auth"
import { Box } from "~/shared/components/box"
import { Card } from "~/shared/components/card"
import { useAppForm } from "~/shared/components/form"
import type { InputRef } from "~/shared/components/form/fields/input"
import { Heading } from "~/shared/components/heading"
import { ScreenRoot } from "~/shared/components/layouts/screen"
import { Text } from "~/shared/components/text"

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

export function SignUpScreen() {
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
    <ScreenRoot className="justify-center">
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
          <Card className="my-auto">
            <Heading>Cadastrar no Pobrin</Heading>
            <signUpform.AppField name="name">
              {(field) => (
                <field.Input
                  isRequired
                  ref={nameRef}
                  autoCapitalize="words"
                  autoCorrect={false}
                  label="Nome"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  placeholder="Como gosta de ser chamado"
                  returnKeyType="next"
                  textContentType="givenName"
                />
              )}
            </signUpform.AppField>
            <signUpform.AppField name="email">
              {(field) => (
                <field.Input
                  isRequired
                  ref={emailRef}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  label="E-mail"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  placeholder="exemplo@email.com"
                  returnKeyType="next"
                  textContentType="emailAddress"
                />
              )}
            </signUpform.AppField>
            <signUpform.AppField name="password">
              {(field) => (
                <field.Input
                  isRequired
                  label="Senha"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  placeholder="Senha ULTRA segura (ou não)"
                  ref={passwordRef}
                  returnKeyType="next"
                  textContentType="password"
                  type="password"
                />
              )}
            </signUpform.AppField>
            <signUpform.AppField name="confirmPassword">
              {(field) => (
                <field.Input
                  isRequired
                  ref={confirmPasswordRef}
                  label="Confirmação da Senha"
                  onSubmitEditing={signUpform.handleSubmit}
                  placeholder="A mesma senha de cima"
                  returnKeyType="done"
                  submitBehavior="submit"
                  textContentType="password"
                  type="password"
                />
              )}
            </signUpform.AppField>
            <Box className="mt-4">
              <signUpform.AppForm>
                <signUpform.AppForm>
                  <signUpform.SubmitButton>Cadastrar</signUpform.SubmitButton>
                </signUpform.AppForm>
              </signUpform.AppForm>
              <Box className="mt-2 flex-row items-center justify-center gap-2">
                <Text>Já possui uma conta?</Text>
                <Link
                  className="text-primary-600 underline"
                  href="/(auth)/sign-in"
                >
                  Entrar
                </Link>
              </Box>
            </Box>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenRoot>
  )
}
