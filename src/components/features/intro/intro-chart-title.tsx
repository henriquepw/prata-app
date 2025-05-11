import { Text, useFont } from "@shopify/react-native-skia"
import { useTheme } from "~/store/slices/theme"
import { formatAmount } from "~/utils/format-amount"

type Props = {
  radius: number
}
export function IntroChartTitle({ radius }: Props) {
  const size = radius * 2
  const amount = formatAmount(100000)
  const theme = useTheme()
  const textColor = theme === "light" ? "black" : "white"

  const label = "Renda"
  const titleFont = useFont(
    require("node_modules/@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf"),
    20,
  )
  const amountFont = useFont(
    require("node_modules/@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf"),
    24,
  )

  if (!titleFont || !amountFont) {
    return null
  }

  const titleDim = titleFont.measureText(label)
  const amountDim = amountFont.measureText(amount)

  const titleY = size / 2 - titleDim.height / 2

  return (
    <>
      <Text
        font={titleFont}
        text={label}
        x={size / 2 - titleDim.width / 2}
        y={titleY}
        color={textColor}
      />
      <Text
        font={amountFont}
        text={amount}
        x={size / 2 - amountDim.width / 2}
        y={titleY + titleDim.height + 10}
        color={textColor}
      />
    </>
  )
}
