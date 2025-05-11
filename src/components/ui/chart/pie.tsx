import { Skia, Canvas, Path, useFont, Text } from "@shopify/react-native-skia"
import { Box } from "../box"
import { useMemo } from "react"

type PieSlice = {
  label: string
  percent: number | string
  color: string
}

type Props = {
  data: PieSlice[]
  radius: number
  strokeWidth: number
  label?: string
}

export function PieChart({ label, data, radius, strokeWidth }: Props) {
  const font = useFont(
    require("node_modules/@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf"),
    24,
  )

  const size = radius * 2
  const innerRadius = radius - strokeWidth
  const paths = useMemo(() => {
    const path = Skia.Path.Make()
    path.addCircle(radius, radius, innerRadius)

    const paths = []
    let currentAngle = 0
    for (let i = 0; i < data.length; i++) {
      const d = data[i]
      const sweepAngle = currentAngle + Number(d.percent) / 100
      paths.push(
        <Path
          key={d.label}
          path={path}
          style="stroke"
          strokeCap="round"
          strokeWidth={strokeWidth}
          color={d.color}
          start={currentAngle}
          end={sweepAngle}
        />,
      )
      currentAngle = sweepAngle
    }

    return paths
  }, [radius, innerRadius, strokeWidth, data])

  const textDim = font?.measureText(label || "")

  return (
    <Box className="items-center justify-center">
      <Canvas style={{ width: size, height: size }}>
        {!!font && !!label && (
          <Text
            font={font}
            text={label}
            x={size / 2 - (textDim?.width || 0) / 2}
            y={size / 2 + (textDim?.height || 0) / 2.5}
            color="white"
          />
        )}
        {paths}
      </Canvas>
    </Box>
  )
}
