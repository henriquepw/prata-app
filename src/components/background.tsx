import { Canvas, FractalNoise, Rect } from "react-native-skia"
import React from "react"
import { useWindowDimensions, View } from "react-native"
import { cn } from "~/lib/cn"

interface Props {
  className?: string
  children?: React.ReactNode
}

export const Background = React.forwardRef<
  React.ComponentRef<typeof View>,
  Props
>(({ className, children }, ref) => {
  const { width, height } = useWindowDimensions()

  return (
    <View className={cn("bg-background flex-1", className)} ref={ref}>
      <Canvas style={{ flex: 1, width, height, position: "absolute" }}>
        <Rect height={height} width={width} x={0} y={0}>
          <FractalNoise freqX={0.5} freqY={0.5} octaves={4} />
        </Rect>
      </Canvas>
      <View
        className="bg-background/90 dark:bg-background/95 absolute"
        style={{ width, height }}
      />
      {children}
    </View>
  )
})

Background.displayName = "Background"
