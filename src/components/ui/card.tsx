import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import { BlurView } from "expo-blur"
import React from "react"
import { View, ViewProps } from "react-native"

const cardStyle = tva({
  slots: {
    root: "overflow-hidden",
    content: "flex flex-col relative z-0 gap-4",
  },
  variants: {
    size: {
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

const Card = React.forwardRef<React.ElementRef<typeof View>, Props>(
  (
    { className, children, size = "md", variant = "outline", ...props },
    ref,
  ) => {
    const s = cardStyle({ size, variant, className })
    return (
      <View className={s.root()}>
        <BlurView intensity={5} className="absolute h-full w-full" />
        <View className={s.content()} {...props} ref={ref}>
          {children}
        </View>
      </View>
    )
  },
)

Card.displayName = "Card"

export { Card }
