import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native"
import { PixelRatio, useWindowDimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { IntroHeader } from "~/components/features/intro/intro-header"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { PieChart } from "~/components/ui/chart/pie"
import { useAppForm } from "~/components/ui/form"
import { Text } from "~/components/ui/text"
import { formatAmount } from "~/utils/format-amount"

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

export default function CreateBalanceScreen() {
  const { width } = useWindowDimensions()
  const form = useAppForm({
    defaultValues: {
      balance: defaultBalance,
    },
  })

  return (
    <Background>
      <SafeAreaView className="flex-1 p-6">
        <IntroHeader
          title="Balanço"
          subtitle="Lorem ipsum dolor sit amet consectetur."
          className="mb-10"
        />

        <form.Subscribe selector={({ values }) => values.balance}>
          {(balance) => (
            <PieChart
              data={balance}
              radius={PixelRatio.roundToNearestPixel(width * 0.36)}
              strokeWidth={40}
              label={formatAmount(100000)}
            />
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
                      className="w-10 rounded-full p-0"
                      onPress={() => field.setValue((s) => s - 5)}
                    >
                      <ButtonIcon as={ChevronLeftIcon} />
                    </Button>
                    <field.Input
                      mask="NUM"
                      textAlign="center"
                      keyboardType="number-pad"
                      conteinerProps={{ className: "min-w-20" }}
                      className="text-2xl"
                      sufix={
                        <Text className="text-primary-500 text-xl">%</Text>
                      }
                    />
                    <Button
                      className="w-10 rounded-full p-0"
                      onPress={() => field.setValue((s) => s + 5)}
                    >
                      <ButtonIcon as={ChevronRightIcon} />
                    </Button>
                  </Box>
                )}
              </form.AppField>
            </Box>
          ))}
        </Box>

        <Button className="mt-auto ml-auto" size="lg">
          <ButtonText>Avançar</ButtonText>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
      </SafeAreaView>
    </Background>
  )
}
