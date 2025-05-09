"use client"
import { createIcon } from "@gluestack-ui/icon"
import { PrimitiveIcon, Svg } from "@gluestack-ui/icon"
import { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import React from "react"

export const UIIcon = createIcon({
  Root: PrimitiveIcon,
})

const iconStyle = tva({
  base: "text-typography-950 fill-none pointer-events-none",
  variants: {
    size: {
      "2xs": "h-3 w-3",
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    },
  },
})

export const Icon = React.forwardRef<
  React.ComponentRef<typeof UIIcon>,
  React.ComponentPropsWithoutRef<typeof UIIcon> &
    VariantProps<typeof iconStyle> & {
      height?: number | string
      width?: number | string
    }
>(({ size = "md", className, ...props }, ref) => {
  if (typeof size === "number") {
    return (
      <UIIcon
        ref={ref as any}
        {...props}
        className={iconStyle({ class: className })}
        size={size}
      />
    )
  }

  if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIIcon
        ref={ref as any}
        {...props}
        className={iconStyle({ class: className })}
      />
    )
  }

  return (
    <UIIcon
      ref={ref as any}
      {...props}
      className={iconStyle({ size, class: className })}
    />
  )
})

type ParameterTypes = Omit<Parameters<typeof createIcon>[0], "Root">

const accessClassName = (style: any) => {
  const styleObject = Array.isArray(style) ? style[0] : style
  const keys = Object.keys(styleObject)
  return styleObject[keys[1]]
}

const createIconUI = ({ ...props }: ParameterTypes) => {
  const NewUIIcon = createIcon({ Root: Svg, ...props })
  return React.forwardRef<
    React.ComponentRef<typeof UIIcon>,
    React.ComponentPropsWithoutRef<typeof UIIcon> &
      VariantProps<typeof iconStyle> & {
        height?: number | string
        width?: number | string
      }
  >(({ className, ...inComingprops }, ref) => {
    const calculateClassName = React.useMemo(() => {
      return className === undefined
        ? accessClassName(inComingprops?.style)
        : className
    }, [className, inComingprops?.style])
    return (
      <NewUIIcon
        ref={ref as any}
        {...inComingprops}
        className={calculateClassName}
      />
    )
  })
}

export { createIconUI as createIcon }
