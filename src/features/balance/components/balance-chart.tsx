import { PixelRatio, useWindowDimensions } from "react-native"
import { PieChart } from "~/shared/components/chart/pie"
import { useBalance } from "../store/balance"

export function BalanceChart() {
  const { width } = useWindowDimensions()
  const radius = PixelRatio.roundToNearestPixel(width * 0.36)

  const balance = useBalance()

  return (
    <PieChart
      data={balance.data?.pieces || []}
      radius={radius}
      label="label"
      strokeWidth={40}
    />
  )
}
