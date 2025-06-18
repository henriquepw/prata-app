import { useRouter } from "expo-router"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react-native"
import { PixelRatio, ScrollView, useWindowDimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { IntroChartTitle } from "~/features/introduction/components/intro-chart-title"
import { IntroHeader } from "~/features/introduction/components/intro-header"
import { getIncome } from "~/features/introduction/store/intro"
import { Background } from "~/shared/components/ui/background"
import { Box } from "~/shared/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/shared/components/ui/button"
import { PieChart } from "~/shared/components/ui/chart/pie"
import { useAppForm } from "~/shared/components/ui/form"
import { Text } from "~/shared/components/ui/text"
import { useUpdateBalance } from "~/shared/store/slices/balance"
import { useCreateRecurrence } from "~/shared/store/slices/recurrence"
import { formatAmount, getOnlyDigits } from "~/shared/utils/format-amount"

type Piece = {
  label: string
  percent: number
  color: string
}

const defaultBalance: Piece[] = [
  { label: "Básico", percent: 50, color: "hsl(173, 80.4%, 80%)" },
  { label: "Poupança", percent: 20, color: "hsl(173, 80.4%, 40%)" },
  { label: "Livre", percent: 30, color: "hsl(173, 80.4%, 25%)" },
]

const schema = z.object({
  balance: z.array(
    z.object({
      label: z.string(),
      percent: z.number().min(0).max(100),
      color: z.string(),
    }),
  ),
})

export function SetupBalanceScreen() {
  const router = useRouter()

  const { width } = useWindowDimensions()
  const radius = PixelRatio.roundToNearestPixel(width * 0.36)

  const createRecurrence = useCreateRecurrence()
  const updateBalance = useUpdateBalance()

  const form = useAppForm({
    defaultValues: {
      balance: defaultBalance,
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      const mutations: Promise<any>[] = []
      console.log("a")
      mutations.push(updateBalance.mutateAsync(value.balance))

      const income = getIncome()
      if (income) {
        mutations.push(
          createRecurrence.mutateAsync({
            amount: +getOnlyDigits(income.amount),
            description: "Renda",
            frequence: income.frequence,
            startAt: new Date(),
            type: "INCOME",
          }),
        )
      }

      await Promise.all(mutations)
      router.replace("/(private)/(tabs)")
    },
  })

  const descrease = (index: number) => {
    let next = index + 1
    if (next === form.getFieldValue("balance").length) {
      next = 0
    }

    form.setFieldValue(`balance[${index}].percent`, (s) => s - 5)
    form.setFieldValue(`balance[${next}].percent`, (s) => s + 5)
  }

  const increase = (index: number) => {
    let next = index + 1
    if (next === form.getFieldValue("balance").length) {
      next = 0
    }

    form.setFieldValue(`balance[${index}].percent`, (s) => s + 5)
    form.setFieldValue(`balance[${next}].percent`, (s) => s - 5)
  }

  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <IntroHeader
            title="Balanço"
            subtitle="Adeque como achar melhor para sua realidade"
            className="mb-10"
          />

          <form.Subscribe selector={({ values }) => values.balance}>
            {(balance) => (
              <PieChart
                data={balance}
                radius={radius}
                strokeWidth={40}
                label={formatAmount(100000)}
              >
                <IntroChartTitle radius={radius} />
              </PieChart>
            )}
          </form.Subscribe>

          <Box className="mt-10 gap-10">
            {form.state.values.balance.map((piece, i) => (
              <Box
                key={piece.label}
                className="flex-row items-center justify-between gap-2"
              >
                <Box className="size-4 items-center justify-center rounded-full bg-primary-500/50">
                  <Box className="size-2 rounded-full bg-primary-500" />
                </Box>
                <Text size="3xl" className="flex-1">
                  {piece.label}
                </Text>
                <form.AppField name={`balance[${i}].percent`}>
                  {(field) => (
                    <Box className="flex-row items-center gap-4">
                      <Button
                        action="negative"
                        className="h-8 w-8 rounded-full p-0"
                        onPress={() => descrease(i)}
                      >
                        <ButtonIcon as={MinusIcon} />
                      </Button>
                      <field.Input
                        mask="NUM"
                        textAlign="center"
                        keyboardType="number-pad"
                        conteinerProps={{ className: "min-w-24" }}
                        className="text-2xl"
                        sufix={
                          <Text className="text-primary-500 text-xl">%</Text>
                        }
                      />
                      <Button
                        action="positive"
                        className="h-8 w-8 rounded-full p-0"
                        onPress={() => increase(i)}
                      >
                        <ButtonIcon as={PlusIcon} />
                      </Button>
                    </Box>
                  )}
                </form.AppField>
              </Box>
            ))}
          </Box>

          <Box className="mt-auto mb-4 flex-row items-center justify-between gap-4">
            <Button size="lg" variant="outline" onPress={router.back}>
              <ButtonIcon as={ChevronLeftIcon} />
              <ButtonText>Voltar</ButtonText>
            </Button>
            <form.AppForm>
              <form.SubmitButton leftIcon={ChevronRightIcon}>
                Avançar
              </form.SubmitButton>
            </form.AppForm>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}
