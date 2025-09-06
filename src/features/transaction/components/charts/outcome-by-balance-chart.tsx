import { Text, useFont } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { PixelRatio, useWindowDimensions, View } from "react-native"
import { type Piece, useBalance } from "~/features/balance/store/balance"
import { Card, CardTitle } from "~/shared/components/card"
import { PieChart, type PieSlice } from "~/shared/components/chart/pie"
import { useTheme } from "~/shared/store/theme"
import { formatAmount } from "~/shared/utils/format-amount"
import { useMontlyTransactions } from "../../store/montly-transactions"
import { type Transaction, TransactionType } from "../../store/types"

function parseChartData(trx: Transaction[] = [], pieces: Piece[] = []) {
  let total = 0
  const map = new Map<string, PieSlice>()
  for (const p of pieces) {
    map.set(p.id, { label: p.label, color: p.color, percent: 0 })
  }

  for (const t of trx) {
    if (t.type === TransactionType.OUTCOME && t.balanceId) {
      const slice = map.get(t.balanceId)
      if (!slice) {
        continue
      }

      total += t.amount
      map.set(t.balanceId, {
        ...slice,
        percent: +slice.percent + t.amount,
      })
    }
  }

  const d = [...map.values()].map((v) => ({
    ...v,
    percent: (+v.percent / total) * 100,
  }))

  console.log({
    total,
    values: [...map.values()].map((v) => v.percent),
    percent: d.map((v) => v.percent),
  })
  return { data: d, total }
}

export function OutcomeByBalanceChart() {
  const balance = useBalance()
  const trx = useMontlyTransactions()
  const { data, total } = useMemo(
    () => parseChartData(trx.data, balance.data?.pieces),
    [trx.data, balance.data?.pieces],
  )

  const { width } = useWindowDimensions()
  const radius = PixelRatio.roundToNearestPixel(width * 0.3)

  return (
    <Card>
      <CardTitle>Gastos do Mês</CardTitle>
      <View className="h-[250px]">
        <PieChart data={data} radius={radius} strokeWidth={30}>
          <TotalLabel radius={radius} total={total} />
        </PieChart>
      </View>
    </Card>
  )
}

function TotalLabel({ radius, total }: { radius: number; total: number }) {
  const theme = useTheme()
  const textColor = theme === "light" ? "black" : "white"

  const amountFont = useFont(
    require("node_modules/@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf"),
    20,
  )
  if (!amountFont) {
    return null
  }

  const size = radius * 2
  const amount = formatAmount(total)
  const amountDim = amountFont.measureText(amount)

  return (
    <Text
      color={textColor}
      font={amountFont}
      text={amount}
      x={size / 2 - amountDim.width / 2}
      y={size / 2}
    />
  )
}
