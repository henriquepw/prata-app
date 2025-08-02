import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { Box } from "../box"

const GAP = 0.055

export type PieSlice = {
  label: string
  percent: number | string
  color: string
}

type Props = {
  data: PieSlice[]
  strokeWidth: number
  radius: number
  label?: string
  children?: React.ReactNode
}

export function PieChart({ children, radius, data, strokeWidth }: Props) {
  const size = radius * 2
  const innerRadius = radius - strokeWidth
  const paths = useMemo(() => {
    const path = Skia.Path.Make()
    path.addCircle(radius, radius, innerRadius)

    const paths = []
    let startAngle = 0
    for (let i = 0; i < data.length; i++) {
      const d = data[i]
      const endAngle = startAngle + Number(d.percent) / 100
      paths.push(
        <Path
          color={d.color}
          key={d.label}
          path={path}
          start={startAngle}
          end={endAngle - GAP}
          strokeCap="round"
          strokeWidth={strokeWidth}
          style="stroke"
        />,
      )
      startAngle = endAngle
    }

    return paths
  }, [radius, innerRadius, strokeWidth, data])

  return (
    <Box className="items-center justify-center">
      <Canvas style={{ width: size, height: size }}>
        {children}
        {paths}
      </Canvas>
    </Box>
  )
}
