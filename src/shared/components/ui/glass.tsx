import { BlurView } from "expo-blur"
import type React from "react"
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
        <BlurView className="absolute size-full" intensity={intensity} />
      )}

      {children}
    </View>
  )
}

Glass.displayName = "Glass"
