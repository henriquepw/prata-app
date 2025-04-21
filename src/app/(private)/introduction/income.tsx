import { Link, useRouter } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonText } from "~/components/ui/button"
import { useAppForm } from "~/components/ui/form"
import { SelectItem } from "~/components/ui/form/fields/select"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { Frequence, useCreateRecurrence } from "~/store/recurrence-store"

const schema = z.object({
  amount: z.string(),
  frequence: z.nativeEnum(Frequence),
})

export default function IntroductionIncomeScreen() {
  const router = useRouter()
  const createTransation = useCreateRecurrence()
  const form = useAppForm({
    defaultValues: {
      amount: "",
      frequence: Frequence.MONTHLY,
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      await createTransation.mutateAsync({
        type: "INCOME",
        frequence: value.frequence,
        description: "Renda",
        startAt: new Date(),
        amount: +value.amount,
      })
      router.push("/introduction/balance")
    },
  })

  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <Heading size="2xl" className="mb-6">
          Renda
        </Heading>
        <View className="mb-2 h-1 w-10 rounded-full bg-primary-500" />
        <Text>
          Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor
          pellentesque in ornare sed sapien. Nam commodo consectetur egestas
          lacus massa eget. Tristique hac non in elementum. Elit pharetra nibh
          aliquet ut nulla in.
        </Text>

        <Box className="mt-16 gap-4">
          <form.AppField name="frequence">
            {(field) => (
              <field.Select label="Frêquencia" initialLabel="Mensal">
                <SelectItem value={Frequence.YEARLY} label="Anual" />
                <SelectItem value={Frequence.MONTHLY} label="Mensal" />
                <SelectItem value={Frequence.BIWEEKLY} label="Quinzenal" />
                <SelectItem value={Frequence.WEEKLY} label="Semanal" />
                <SelectItem value={Frequence.DAILY} label="Diário" />
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name="amount">
            {(field) => (
              <field.Input
                label="Renda"
                placeholder="0,00"
                prefix={
                  <Text className="font-bold text-primary-500 text-xl">R$</Text>
                }
              />
            )}
          </form.AppField>
        </Box>

        <Box className="mt-auto flex-row items-center justify-between gap-2">
          <Link asChild href="/introduction/balance">
            <Button variant="outline">
              <ButtonText>Pular</ButtonText>
            </Button>
          </Link>
          <form.AppForm>
            <form.SubmitButton rightIcon={ChevronRightIcon} isLoading>
              Avançar
            </form.SubmitButton>
          </form.AppForm>
        </Box>
      </SafeAreaView>
    </Background>
  )
}
