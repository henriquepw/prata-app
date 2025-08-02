import { Circle, useFont } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { View } from "react-native"
import type { SharedValue } from "react-native-reanimated"
import {
  Bar,
  CartesianChart,
  useChartPressState,
  type Viewport,
} from "victory-native"
import { Card, CardTitle } from "~/shared/components/card"
import { THEME } from "~/shared/components/gluestack-ui-provider/config"
import { useChartTransactions } from "../../store/chart"
import { type Transaction, TransactionType } from "../../store/types"

type ChartData = {
  month: number
  value: number
}

function parseChartData(trx: Transaction[]) {
  const data: ChartData[] = Array.from({ length: 12 })
    .fill(0)
    .map((_, i) => ({ month: i, value: 0 }))

  for (const t of trx) {
    if (t.type === TransactionType.OUTCOME) {
      const month = new Date(t.receivedAt).getMonth()
      data[month].value = data[month].value + t.amount
    }
  }

  return data
}

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="white" />
}

const month = [
  "jan",
  "fev",
  "mar",
  "abr",
  "maio",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

const viewport: Viewport = { x: [-1, 12] } as const
const barColor = `rgb(${THEME.primary[5]})` as const
const roundedCorners = { topLeft: 4, topRight: 4 } as const

export function YearlyOutcomeChart() {
  const trx = useChartTransactions()
  const data = useMemo(() => parseChartData(trx.data || []), [trx.data])

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { value: 0 },
  })

  const font = useFont(
    require("node_modules/@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf"),
    12,
  )

  return (
    <Card>
      <CardTitle>Gastos em 2025</CardTitle>
      <View className="h-[250px]">
        <CartesianChart
          data={data}
          xKey="month"
          yKeys={["value"]}
          chartPressState={state}
          viewport={viewport}
          axisOptions={{
            font,
            formatYLabel: (v) => Math.floor(v / 100).toString(),
            formatXLabel: (v) => month[v] || "0",
            lineColor: "rgba(255,255,255, 20%)",
            labelColor: "white",
          }}
        >
          {({ points, chartBounds }) => (
            <>
              <Bar
                color={barColor}
                points={points.value}
                chartBounds={chartBounds}
                roundedCorners={roundedCorners}
              />

              {isActive && (
                <ToolTip x={state.x.position} y={state.y.value.position} />
              )}
            </>
          )}
        </CartesianChart>
      </View>
    </Card>
  )
}
