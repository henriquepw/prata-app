import { BlurView } from "expo-blur"
import React from "react"
import { View } from "react-native"
import { cn } from "~/utils/cn"

type Props = {
  children?: React.ReactNode
  className?: string
  intensity?: number
}
export function Glass({ children, intensity = 10, className }: Props) {
  return (
    <View className={cn("overflow-hidden", className)}>
      <BlurView intensity={intensity} className="absolute size-full" />
      {children}
    </View>
  )
}

Glass.displayName = "Glass"
