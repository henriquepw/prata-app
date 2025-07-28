import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import React from "react"
import { View, type ViewProps } from "react-native"
import { cn } from "../utils/cn"
import { Glass } from "./glass"
import { Heading, type HeadingProps } from "./heading"

const cardStyle = tva({
  slots: {
    root: "",
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
        root: "border border-outline-100",
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
    contentClassName?: string
  }

const Card = React.forwardRef<React.ComponentRef<typeof View>, Props>(
  (
    {
      className,
      contentClassName,
      children,
      size = "md",
      variant = "outline",
      ...props
    },
    ref,
  ) => {
    const s = cardStyle({ size, variant })
    return (
      <Glass className={s.root({ className })} intensity={80}>
        <View
          className={s.content({ className: contentClassName })}
          {...props}
          ref={ref}
        >
          {children}
        </View>
      </Glass>
    )
  },
)

Card.displayName = "Card"

const CardTitle = React.forwardRef<
  React.ComponentRef<typeof Heading>,
  HeadingProps
>(({ children, className, ...rest }, ref) => {
  return (
    <Heading
      className={cn("mb-b w-full text-center", className)}
      size="xl"
      ref={ref}
      {...rest}
    >
      {children}
    </Heading>
  )
})

CardTitle.displayName = "CardTitle"

export { Card, CardTitle }
