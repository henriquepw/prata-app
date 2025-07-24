import { Circle, useFont } from "@shopify/react-native-skia"
import { View } from "react-native"
import type { SharedValue } from "react-native-reanimated"
import {
  Bar,
  CartesianChart,
  useChartPressState,
  Viewport,
} from "victory-native"
import { Card } from "~/shared/components/card"
import { PRIMARY_COLOR } from "~/shared/components/gluestack-ui-provider/config"

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
const DATA = Array.from({ length: 12 }, (_, i) => ({
  day: month[i],
  highTmp: Math.floor(400 + 3000 * Math.random()),
}))

const viewport: Viewport = { x: [-1, 12] }

const barColor = `rgb(${PRIMARY_COLOR[5].split(" ").join(",")})`

export function TransactionYearlyChart() {
  const { state, isActive } = useChartPressState({
    x: "jan",
    y: { highTmp: 0 },
  })

  const font = useFont(
    require("node_modules/@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf"),
    12,
  )

  return (
    <Card className="h-[300px]">
      <View className="h-full">
        <CartesianChart
          data={DATA}
          xKey="day"
          yKeys={["highTmp"]}
          chartPressState={state}
          axisOptions={{
            font,
            labelColor: "white",
          }}
          viewport={viewport}
        >
          {({ points, chartBounds }) => (
            <>
              <Bar
                points={points.highTmp}
                chartBounds={chartBounds}
                color={barColor}
                roundedCorners={{ topLeft: 4, topRight: 4 }}
              />

              {isActive && (
                <ToolTip x={state.x.position} y={state.y.highTmp.position} />
              )}
            </>
          )}
        </CartesianChart>
      </View>
    </Card>
  )
}
