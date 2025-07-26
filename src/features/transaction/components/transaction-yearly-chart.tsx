import { Circle, useFont } from "@shopify/react-native-skia"
import { View } from "react-native"
import type { SharedValue } from "react-native-reanimated"
import {
  Bar,
  CartesianChart,
  useChartPressState,
  type Viewport,
} from "victory-native"
import { CardTitle } from "~/shared/components/card"
import { PRIMARY_COLOR } from "~/shared/components/gluestack-ui-provider/config"
import { useChartTransactions } from "../store/chart"

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

const barColor = `rgb(${PRIMARY_COLOR[5].split(" ").join(",")})` as const

const roundedCorners = { topLeft: 4, topRight: 4 } as const

export function TransactionYearlyChart() {
  const trx = useChartTransactions()

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { value: 0 },
  })

  const font = useFont(
    require("node_modules/@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf"),
    12,
  )

  return (
    <View>
      <CardTitle>Gastos em 2025</CardTitle>
      <View className="h-[250px]">
        <CartesianChart
          data={trx.data}
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
    </View>
  )
}
