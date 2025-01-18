import React from "react"
import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import { View, ViewProps } from "react-native"

const cardStyle = tva({
  base: "flex flex-col relative z-0 gap-4",
  variants: {
    size: {
      sm: "p-3 rounded-md",
      md: "p-4 rounded-xl",
      lg: "p-6 rounded-2xl",
    },
    variant: {
      outline:
        "bg-background-100/30 dark:bg-background-50/10 border border-outline-200",
      ghost: "rounded-none",
    },
  },
})

type Props = ViewProps &
  VariantProps<typeof cardStyle> & {
    className?: string
  }

const Card = React.forwardRef<React.ElementRef<typeof View>, Props>(
  ({ className, size = "md", variant = "outline", ...props }, ref) => {
    return (
      <View
        className={cardStyle({ size, variant, className })}
        {...props}
        ref={ref}
      />
    )
  },
)

Card.displayName = "Card"

export { Card }
