import { Link, useRouter } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Frequence } from "~/features/recurrence/store/recurrence"
import { Background } from "~/shared/components/background"
import { Box } from "~/shared/components/box"
import { Button, ButtonText } from "~/shared/components/button"
import { useAppForm } from "~/shared/components/form"
import { SelectItem } from "~/shared/components/form/fields/select"
import { MoneyPrefix } from "~/shared/components/form/prefix"
import { formatAmount } from "~/shared/utils/format-amount"
import { IntroHeader } from "../components/intro-header"
import { useIncome, useSetIncome } from "../store/intro"

const schema = z.object({
  amount: z.string(),
  frequence: z.nativeEnum(Frequence),
})

const defaultValues = {
  amount: formatAmount(0, false),
  frequence: Frequence.MONTHLY,
}

export function RegisterIncomeScreen() {
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
          subtitle="Lorem ipsum dolor sit amet consectetur. Enim habitasse tempor tortor pellentesque in ornare sed sapien. Nam commodo consectetur egestas lacus massa eget. Tristique hac non in elementum. Elit pharetra nibh aliquet ut nulla in."
          title="Renda"
        />

        <Box className="mt-16 gap-4">
          <form.AppField name="frequence">
            {(field) => (
              <field.Select initialLabel="Mensal" label="Frêquencia">
                <SelectItem label="Anual" value={Frequence.YEARLY} />
                <SelectItem label="Mensal" value={Frequence.MONTHLY} />
                <SelectItem label="Quinzenal" value={Frequence.BIWEEKLY} />
                <SelectItem label="Semanal" value={Frequence.WEEKLY} />
                <SelectItem label="Diário" value={Frequence.DAILY} />
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name="amount">
            {(field) => (
              <field.Input
                label="Renda"
                mask="MONEY"
                placeholder="0,00"
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
