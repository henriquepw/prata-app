import { ChevronRightIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Pie, PolarChart } from "victory-native"
import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Text } from "~/components/ui/text"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { useAppForm } from "~/components/ui/form"
import { IntroHeader } from "~/components/features/intro/intro-header"

type Piece = {
  label: string
  percent: number
  color: string
}

const defaultBalance: Piece[] = [
  { label: "Básico", percent: 50, color: "#f00" },
  { label: "Poupança", percent: 20, color: "#00f" },
  { label: "Livre", percent: 30, color: "#0f0" },
]

export default function CreateBalanceScreen() {
  const form = useAppForm({
    defaultValues: {
      balance: defaultBalance,
    },
  })

  return (
    <Background>
      <SafeAreaView className="flex-1 p-4">
        <IntroHeader
          title="Balanço"
          subtitle="Lorem ipsum dolor sit amet consectetur."
          className="mb-10"
        />

        <form.Subscribe selector={({ values }) => values.balance}>
          {(balance) => (
            <Box className="h-80">
              <PolarChart
                data={balance}
                labelKey="label"
                valueKey="percent"
                colorKey="color"
              >
                <Pie.Chart innerRadius={90} />
              </PolarChart>
            </Box>
          )}
        </form.Subscribe>

        <Box className="mt-10 gap-6">
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
              <Box className="min-w-24">
                <form.AppField name={`balance[${i}].percent`}>
                  {(field) => (
                    <field.Input
                      mask="NUM"
                      textAlign="center"
                      keyboardType="number-pad"
                      className="text-2xl"
                      sufix={
                        <Text className="text-primary-500 text-xl">%</Text>
                      }
                    />
                  )}
                </form.AppField>
              </Box>
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
