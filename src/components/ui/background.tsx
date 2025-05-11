import { Canvas, FractalNoise, Rect } from "@shopify/react-native-skia"
import React from "react"
import { View, useWindowDimensions } from "react-native"
import { cn } from "~/utils/cn"

interface Props {
  className?: string
  children: React.ReactElement
}

const Background = React.forwardRef<View, Props>(
  ({ className, children }, ref) => {
    const { width, height } = useWindowDimensions()

    return (
      <View ref={ref} className={cn("flex-1 bg-background-0", className)}>
        <Canvas style={{ flex: 1, width, height, position: "absolute" }}>
          <Rect x={0} y={0} width={width} height={height}>
            <FractalNoise freqX={0.4} freqY={0.4} octaves={4} />
          </Rect>
        </Canvas>
        <View
          className="absolute bg-background-0/90 dark:bg-background-0/95"
          style={{ width, height }}
        />
        {children}
      </View>
    )
  },
)

Background.displayName = "Background"
export { Background }
