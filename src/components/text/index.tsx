import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import React from "react"
import { Text as RNText } from "react-native"
import { textStyle } from "./styles"

export type TextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyle>

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, TextProps>(
  (
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = "md",
      sub,
      italic,
      highlight,
      ...props
    },
    ref,
  ) => {
    return (
      <RNText
        className={textStyle({
          isTruncated,
          bold,
          underline,
          strikeThrough,
          size,
          sub,
          italic,
          highlight,
          class: className,
        })}
        {...props}
        ref={ref}
      />
    )
  },
)

Text.displayName = "Text"

export { Text }
