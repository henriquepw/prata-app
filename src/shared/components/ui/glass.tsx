import { BlurView } from "expo-blur"
import React from "react"
import { Platform, View } from "react-native"
import { cn } from "~/shared/utils/cn"

type Props = {
  children?: React.ReactNode
  className?: string
  intensity?: number
}
export function Glass({ children, intensity = 10, className }: Props) {
  return (
    <View
      className={cn(
        "overflow-hidden",
        Platform.OS === "android" && "bg-background-50",
        className,
      )}
    >
      {Platform.OS !== "android" && (
        <BlurView intensity={intensity} className="absolute size-full" />
      )}

      {children}
    </View>
  )
}

Glass.displayName = "Glass"
