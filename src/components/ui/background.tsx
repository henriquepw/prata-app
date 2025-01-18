import { Slot } from "@radix-ui/react-slot"
import React from "react"
import { View, ViewProps } from "react-native"
import { cn } from "~/utils/cn"

type Props =
  | {
      asChild: true
      className?: string
      children: React.ReactElement
    }
  | ({ asChild?: false } & ViewProps)

const Background = React.forwardRef<View, Props>(
  ({ asChild, className, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot className={cn("flex-1 bg-background-0", className)}>
          {children}
        </Slot>
      )
    }

    return (
      <View
        ref={ref}
        {...props}
        className={cn("flex-1 bg-background-0", className)}
      >
        {children}
      </View>
    )
  },
)

Background.displayName = "Background"
export { Background }
