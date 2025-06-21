import { Text, useFont } from "@shopify/react-native-skia"
import { useTheme } from "~/shared/store/theme"
import { useIncome } from "../store/intro"

type Props = {
  radius: number
}
export function IntroChartTitle({ radius }: Props) {
  const theme = useTheme()
  const textColor = theme === "light" ? "black" : "white"

  const income = useIncome()

  const titleFont = useFont(
    require("node_modules/@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf"),
    20,
  )
  const amountFont = useFont(
    require("node_modules/@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf"),
    24,
  )

  if (!titleFont || !amountFont || !income) {
    return null
  }

  const size = radius * 2

  const title = "Renda"
  const titleDim = titleFont.measureText(title)
  const titleY = size / 2 - titleDim.height / 2

  const amountDim = amountFont.measureText(income?.amount)

  return (
    <>
      <Text
        color={textColor}
        font={titleFont}
        text={title}
        x={size / 2 - titleDim.width / 2}
        y={titleY}
      />
      <Text
        color={textColor}
        font={amountFont}
        text={income.amount}
        x={size / 2 - amountDim.width / 2}
        y={titleY + titleDim.height + 10}
      />
    </>
  )
}
