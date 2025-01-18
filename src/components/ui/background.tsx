import React from "react"
import { View, ViewProps } from "react-native"
import { cn } from "~/utils/cn"

const Background = React.forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        className={cn("flex-1 bg-background-0", className)}
      />
    )
  },
)

Background.displayName = "Background"
export { Background }
