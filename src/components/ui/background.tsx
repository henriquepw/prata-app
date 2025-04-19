import React from "react"
import { View } from "react-native"
import { cn } from "~/utils/cn"
import { Canvas, Rect, FractalNoise } from "@shopify/react-native-skia"
import { Dimensions } from "react-native"

interface Props {
  className?: string
  children: React.ReactElement
}

const Background = React.forwardRef<View, Props>(
  ({ className, children, ...props }, ref) => {
    const { width, height } = Dimensions.get("window")
    return (
      <View
        ref={ref}
        {...props}
        className={cn("flex-1 bg-background-0", className)}
      >
        <Canvas style={{ flex: 1, width, height, position: "absolute" }}>
          <Rect x={0} y={0} width={width} height={height}>
            <FractalNoise freqX={0.6} freqY={0.6} octaves={4} />
          </Rect>
        </Canvas>
        <View
          className="absolute bg-background-0/95"
          style={{ width, height }}
        />
        {children}
      </View>
    )
  },
)

Background.displayName = "Background"
export { Background }
