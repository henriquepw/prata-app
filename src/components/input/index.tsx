"use client"
import { UIIcon } from "@gluestack-ui/core/icon/creator"
import { createInput } from "@gluestack-ui/core/input/creator"
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils"
import {
  tva,
  useStyleContext,
  withStyleContext,
} from "@gluestack-ui/utils/nativewind-utils"
import React from "react"
import { Pressable, TextInput, View } from "react-native"
import { withUniwind } from "uniwind"
import { Glass } from "../glass"

const SCOPE = "INPUT"

const StyledUIIcon = withUniwind(UIIcon)

const UIInput = createInput({
  Root: withStyleContext(View, SCOPE),
  Icon: StyledUIIcon,
  Slot: Pressable,
  Input: TextInput,
})

const inputStyle = tva({
  base: [
    "border-border flex-row overflow-hidden content-center items-center",
    "data-[hover=true]:border-input",
    "data-[focus=true]:border-primary data-[focus=true]:hover:border-primary",
    "data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-input",
  ],

  variants: {
    size: {
      xl: "h-12",
      lg: "h-11",
      md: "h-10",
      sm: "h-9",
    },

    variant: {
      underlined:
        "rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-destructive data-[invalid=true]:hover:border-destructive data-[invalid=true]:data-[focus=true]:border-destructive data-[invalid=true]:data-[focus=true]:hover:border-destructive data-[invalid=true]:data-[disabled=true]:hover:border-destructive",

      outline:
        "rounded border data-[invalid=true]:border-destructive data-[invalid=true]:hover:border-destructive data-[invalid=true]:data-[focus=true]:border-destructive data-[invalid=true]:data-[focus=true]:hover:border-destructive data-[invalid=true]:data-[disabled=true]:hover:border-destructive data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-ring data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-destructive data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-destructive data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-destructive",

      rounded:
        "rounded-full border data-[invalid=true]:border-destructive data-[invalid=true]:hover:border-destructive data-[invalid=true]:data-[focus=true]:border-destructive data-[invalid=true]:data-[focus=true]:hover:border-destructive data-[invalid=true]:data-[disabled=true]:hover:border-destructive data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-ring data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-destructive data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-destructive data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-destructive",
    },
  },
})

const inputIconStyle = tva({
  base: "justify-center items-center text-muted-foreground fill-none",
  parentVariants: {
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

const inputSlotStyle = tva({
  base: "justify-center items-center web:disabled:cursor-not-allowed",
})

const inputFieldStyle = tva({
  base: "flex-1 text-foreground py-0 px-3 placeholder:text-muted-foreground h-full ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed",

  parentVariants: {
    variant: {
      underlined: "web:outline-0 web:outline-none px-0",
      outline: "web:outline-0 web:outline-none",
      rounded: "web:outline-0 web:outline-none px-4",
    },

    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
})

export type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & { className?: string }
const Input = React.forwardRef<React.ComponentRef<typeof UIInput>, IInputProps>(
  ({ className, variant = "outline", size = "md", ...props }, ref) => {
    return (
      <Glass>
        <UIInput
          ref={ref}
          {...props}
          className={inputStyle({ variant, size, class: className })}
          context={{ variant, size }}
        />
      </Glass>
    )
  },
)

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> &
  VariantProps<typeof inputIconStyle> & {
    className?: string
    height?: number
    width?: number
  }

const InputIcon = React.forwardRef<
  React.ComponentRef<typeof UIInput.Icon>,
  IInputIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE)

  if (typeof size === "number") {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
        size={size}
      />
    )
  }

  if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
      />
    )
  }

  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
    />
  )
})

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string }

const InputSlot = React.forwardRef<
  React.ComponentRef<typeof UIInput.Slot>,
  IInputSlotProps
>(({ className, ...props }, ref) => {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        class: className,
      })}
    />
  )
})

export type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string }

const InputField = React.forwardRef<
  React.ComponentRef<typeof UIInput.Input>,
  IInputFieldProps
>(({ className, ...props }, ref) => {
  const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE)

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      className={inputFieldStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
        },
        class: className,
      })}
    />
  )
})

Input.displayName = "Input"
InputIcon.displayName = "InputIcon"
InputSlot.displayName = "InputSlot"
InputField.displayName = "InputField"

export { Input, InputField, InputIcon, InputSlot }
