import { BlurView } from "expo-blur"
import React from "react"
import { Platform, View } from "react-native"
import { cn } from "~/utils/cn"

type Props = {
  children?: React.ReactNode
  className?: string
  intensity?: number
  androidBlur?: boolean
}
export function Glass({ children, intensity = 10, className }: Props) {
  return (
    <View className={cn("overflow-hidden", className)}>
      {Platform.OS === "ios" ? (
        <BlurView intensity={intensity} className="absolute size-full" />
      ) : (
        <View className="absolute size-full bg-background-0/40" />
      )}

      {children}
    </View>
  )
}

Glass.displayName = "Glass"
