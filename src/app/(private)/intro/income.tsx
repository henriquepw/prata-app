import { Link, useRouter } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { IntroHeader } from "~/components/features/intro/intro-header"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonText } from "~/components/ui/button"
import { useAppForm } from "~/components/ui/form"
import { SelectItem } from "~/components/ui/form/fields/select"
import { MoneyPrefix } from "~/components/ui/form/prefix"
import { useIncome, useSetIncome } from "~/store/slices/intro"
import { Frequence } from "~/store/slices/recurrence"
import { formatAmount } from "~/utils/format-amount"

const schema = z.object({
  amount: z.string(),
  frequence: z.nativeEnum(Frequence),
})

const defaultValues = {
  amount: formatAmount(0, false),
  frequence: Frequence.MONTHLY,
}

export default function IntroductionIncomeScreen() {
  const router = useRouter()

  const income = useIncome()
  const setIncome = useSetIncome()

  const form = useAppForm({
    defaultValues: income || defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => {
      setIncome(value)
      router.push("/intro/balance")
    },
  })

  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <IntroHeader
          title="Renda"
          subtitle="Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor pellentesque in ornare sed sapien. Nam commodo consectetur egestas lacus massa eget. Tristique hac non in elementum. Elit pharetra nibh aliquet ut nulla in."
        />

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
                mask="MONEY"
                prefix={<MoneyPrefix />}
              />
            )}
          </form.AppField>
        </Box>

        <Box className="mt-auto flex-row items-center justify-between gap-2">
          <Link asChild href="/intro/balance">
            <Button variant="outline">
              <ButtonText>Pular</ButtonText>
            </Button>
          </Link>
          <form.AppForm>
            <form.SubmitButton rightIcon={ChevronRightIcon}>
              Avançar
            </form.SubmitButton>
          </form.AppForm>
        </Box>
      </SafeAreaView>
    </Background>
  )
}
