import { createToastHook } from "@gluestack-ui/core/toast/creator"
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils"
import {
  tva,
  useStyleContext,
  withStyleContext,
} from "@gluestack-ui/utils/nativewind-utils"
import React from "react"
import { AccessibilityInfo, Text, View } from "react-native"
import Animated, { SlideInUp } from "react-native-reanimated"
import { withUniwind } from "uniwind"

const useToast = createToastHook(View)

const AnimatedView = Animated.createAnimatedComponent(View)
const StyledAnimatedView = withUniwind(AnimatedView)
const SCOPE = "TOAST"

const toastStyle = tva({
  base: "p-4 m-1 rounded-md gap-1 web:pointer-events-auto shadow-hard-5 border-border",
  variants: {
    action: {
      error: "bg-destructive",
      warning: "bg-warning",
      success: "bg-success",
      info: "bg-info",
      muted: "bg-foreground",
    },

    variant: {
      solid: "",
      outline: "border bg-background",
    },
  },
})

const toastTitleStyle = tva({
  base: "text-primary-foreground font-medium font-body tracking-md text-left",
  variants: {
    isTruncated: {
      true: "",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
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
  parentVariants: {
    variant: {
      solid: "",
      outline: "",
    },
    action: {
      error: "",
      warning: "",
      success: "",
      info: "",
      muted: "",
    },
  },
  parentCompoundVariants: [
    {
      variant: "outline",
      action: "error",
      class: "text-destructive",
    },
    {
      variant: "outline",
      action: "warning",
      class: "text-warning",
    },
    {
      variant: "outline",
      action: "success",
      class: "text-success",
    },
    {
      variant: "outline",
      action: "info",
      class: "text-info",
    },
    {
      variant: "outline",
      action: "muted",
      class: "text-foreground",
    },
  ],
})

const toastDescriptionStyle = tva({
  base: "font-normal font-body tracking-md text-left",
  variants: {
    isTruncated: {
      true: "",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
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
  parentVariants: {
    variant: {
      solid: "text-background",
      outline: "text-foreground",
    },
  },
})

const Root = withStyleContext(StyledAnimatedView, SCOPE)
type IToastProps = React.ComponentProps<typeof Root> & {
  className?: string
} & VariantProps<typeof toastStyle>

const Toast = React.forwardRef<React.ComponentRef<typeof Root>, IToastProps>(
  function Toast(
    { className, variant = "solid", action = "muted", ...props },
    ref,
  ) {
    return (
      <Root
        entering={SlideInUp}
        className={toastStyle({ variant, action, class: className })}
        context={{ variant, action }}
        ref={ref}
        {...props}
      />
    )
  },
)

type IToastTitleProps = React.ComponentProps<typeof Text> & {
  className?: string
} & VariantProps<typeof toastTitleStyle>

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof Text>,
  IToastTitleProps
>(function ToastTitle({ className, size = "md", children, ...props }, ref) {
  const { variant: parentVariant, action: parentAction } =
    useStyleContext(SCOPE)
  React.useEffect(() => {
    // Issue from react-native side
    // Hack for now, will fix this later
    AccessibilityInfo.announceForAccessibility(children as string)
  }, [children])

  return (
    <Text
      {...props}
      aria-atomic="true"
      aria-live="assertive"
      className={toastTitleStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
          action: parentAction,
        },
      })}
      ref={ref}
      role="alert"
    >
      {children}
    </Text>
  )
})

type IToastDescriptionProps = React.ComponentProps<typeof Text> & {
  className?: string
} & VariantProps<typeof toastDescriptionStyle>

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof Text>,
  IToastDescriptionProps
>(function ToastDescription({ className, size = "md", ...props }, ref) {
  const { variant: parentVariant } = useStyleContext(SCOPE)
  return (
    <Text
      ref={ref}
      {...props}
      className={toastDescriptionStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
        },
      })}
    />
  )
})

Toast.displayName = "Toast"
ToastTitle.displayName = "ToastTitle"
ToastDescription.displayName = "ToastDescription"

export { Toast, ToastDescription, ToastTitle, useToast }
