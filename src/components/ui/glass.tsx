import { BlurView } from "expo-blur"
import React from "react"
import { View } from "react-native"
import { cn } from "~/utils/cn"

type Props = {
  children: React.ReactNode
  className?: string
}
export function Glass({ children, className }: Props) {
  return (
    <View className={cn("overflow-hidden", className)}>
      <BlurView intensity={8} className="absolute h-full w-full" />
      {children}
    </View>
  )
}

Glass.displayName = "Glass"
