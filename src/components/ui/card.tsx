import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import React from "react"
import { View, ViewProps } from "react-native"
import { Glass } from "./glass"

const cardStyle = tva({
  slots: {
    root: "overflow-hidden",
    content: "flex flex-col relative z-0 gap-4",
  },
  variants: {
    size: {
      xs: {
        content: "p-0",
      },
      sm: {
        root: "rounded-md",
        content: "p-3",
      },
      md: {
        root: "rounded-xl",
        content: "p-4",
      },
      lg: {
        root: "rounded-2xl",
        content: "p-6",
      },
    },
    variant: {
      outline: {
        root: "bg-background-100/40 dark:bg-background-50/20 border border-outline-50",
      },
      ghost: {
        root: "rounded-none",
      },
    },
  },
})

type Props = ViewProps &
  VariantProps<typeof cardStyle> & {
    className?: string
  }

const Card = React.forwardRef<React.ComponentRef<typeof View>, Props>(
  (
    { className, children, size = "md", variant = "outline", ...props },
    ref,
  ) => {
    const s = cardStyle({ size, variant })
    return (
      <Glass className={s.root({ className })}>
        <View className={s.content()} {...props} ref={ref}>
          {children}
        </View>
      </Glass>
    )
  },
)

Card.displayName = "Card"

export { Card }
