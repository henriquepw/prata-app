"use client"
import {
  createIcon,
  type IPrimitiveIcon,
  PrimitiveIcon,
  Svg,
} from "@gluestack-ui/icon"
import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import { tva } from "@gluestack-ui/nativewind-utils/tva"
import { cssInterop } from "nativewind"
import React from "react"

export const UIIcon = createIcon({
  Root: PrimitiveIcon,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
    React.RefAttributes<React.ComponentRef<typeof Svg>>
>

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

cssInterop(UIIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true,
    },
  },
})

type IIConProps = IPrimitiveIcon &
  VariantProps<typeof iconStyle> &
  React.ComponentPropsWithoutRef<typeof UIIcon>

const Icon = React.forwardRef<React.ComponentRef<typeof Svg>, IIConProps>(
  ({ size = "md", className, ...props }, ref) => {
    if (typeof size === "number") {
      return (
        <UIIcon
          ref={ref}
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
          ref={ref}
          {...props}
          className={iconStyle({ class: className })}
        />
      )
    }

    return (
      <UIIcon
        ref={ref}
        {...props}
        className={iconStyle({ size, class: className })}
      />
    )
  },
)

export { Icon }

type ParameterTypes = Omit<Parameters<typeof createIcon>[0], "Root">

const createIconUI = ({ ...props }: ParameterTypes) => {
  const UIIconCreateIcon = createIcon({
    Root: Svg,
    ...props,
  }) as React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
      React.RefAttributes<React.ComponentRef<typeof Svg>>
  >

  return React.forwardRef<React.ComponentRef<typeof Svg>>(
    (
      {
        className,
        size,
        ...inComingProps
      }: VariantProps<typeof iconStyle> &
        React.ComponentPropsWithoutRef<typeof UIIconCreateIcon>,
      ref,
    ) => {
      return (
        <UIIconCreateIcon
          ref={ref}
          {...inComingProps}
          className={iconStyle({ size, class: className })}
        />
      )
    },
  )
}
export { createIconUI as createIcon }
