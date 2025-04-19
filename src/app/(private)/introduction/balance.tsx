import { Background } from "~/components/ui/background"
import { Box } from "~/components/ui/box"
import { Heading } from "~/components/ui/heading"
import { Select, SelectItem } from "~/components/ui/form/select"
import { ChevronRightIcon } from "lucide-react-native"
import { Pie, PolarChart } from "victory-native"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { SafeAreaView } from "react-native-safe-area-context"

const defaultBalance = [
  {
    label: "Básico",
    percent: 50,
    color: "#f00",
  },
  {
    label: "Diversão",
    percent: 30,
    color: "#00f",
  },
  {
    label: "Guardar",
    percent: 20,
    color: "#0f0",
  },
]

export default function CreateBalanceScreen() {
  return (
    <Background asChild>
      <SafeAreaView className="flex-1 p-4">
        <Box>
          <Heading size="xl">Configuração Inicial</Heading>
        </Box>
        <Select>
          <SelectItem label="Conservador" value="ux" />
          <SelectItem label="Web Development" value="web" />
          <SelectItem
            label="Cross Platform Development Process"
            value="Cross Platform Development Process"
          />
          <SelectItem label="UI Designing" value="ui" isDisabled={true} />
          <SelectItem label="Backend Development" value="backend" />
        </Select>

        <Box className="h-80">
          <PolarChart
            data={defaultBalance}
            labelKey="label"
            valueKey="percent"
            colorKey="color"
            containerStyle={{ flex: 1 }}
          >
            <Pie.Chart innerRadius={90} />
          </PolarChart>
        </Box>

        <Button className="mt-auto ml-auto" size="lg">
          <ButtonText>Avançar</ButtonText>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
      </SafeAreaView>
    </Background>
  )
}
