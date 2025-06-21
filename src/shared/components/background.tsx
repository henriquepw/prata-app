import { Canvas, FractalNoise, Rect } from "@shopify/react-native-skia"
import React from "react"
import { useWindowDimensions, View } from "react-native"
import { cn } from "~/shared/utils/cn"

interface Props {
  className?: string
  children?: React.ReactNode
}

const Background = React.forwardRef<View, Props>(
  ({ className, children }, ref) => {
    const { width, height } = useWindowDimensions()

    return (
      <View className={cn("flex-1 bg-background-0", className)} ref={ref}>
        <Canvas style={{ flex: 1, width, height, position: "absolute" }}>
          <Rect height={height} width={width} x={0} y={0}>
            <FractalNoise freqX={0.5} freqY={0.5} octaves={4} />
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
