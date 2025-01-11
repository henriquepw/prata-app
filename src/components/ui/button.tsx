import { createContext, forwardRef, useContext } from "react"
import { Pressable, Text } from "react-native"
import { View } from "react-native-reanimated/lib/typescript/Animated"
import { VariantProps, tv } from "tailwind-variants"

const variants = tv({
  slots: {
    container: "flex-row items-center gap-2",
    icon: "text-xl",
    text: "items-center whitespace-nowrap font-bold text-base",
  },
  variants: {
    size: {
      sm: {
        container: "px-2 py-1 rounded-lg",
        text: "text-sm",
        icon: "text-lg",
      },
      md: {
        container: "px-3 py-2 rounded-xl",
      },
      lg: {
        container: "px-4 py-3 rounded-xl",
      },
    },
    color: {
      primary: {
        container: "bg-primary-action",
        icon: "text-primary-dim",
        text: "text-primary-dim",
      },
      denger: {
        container: "bg-red-action",
        text: "text-red-dim",
        icon: "text-red-dim",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
})

const ctx = createContext({} as VariantProps<typeof variants>)

type BtnProps = VariantProps<typeof variants> & {
  children?: React.ReactNode
  className?: string
  onPress?: () => void
}

export const Button = forwardRef(
  (
    { children, className, onPress, ...rest }: BtnProps,
    ref: React.Ref<View>,
  ) => {
    return (
      <ctx.Provider value={rest}>
        <Pressable
          ref={ref}
          onPress={onPress}
          className={variants(rest).container({ className })}
        >
          {typeof children === "string" ? (
            <ButtonText>{children}</ButtonText>
          ) : (
            children
          )}
        </Pressable>
      </ctx.Provider>
    )
  },
)

type BtnTextProps = {
  children: string
  className?: string
}
export function ButtonText({ children, className }: BtnTextProps) {
  const props = useContext(ctx)
  return <Text className={variants(props).text({ className })}>{children}</Text>
}

type BtnIconProps = {
  className?: string
  icon: (p: { className?: string }) => JSX.Element
}
export function ButtonIcon({ icon: Icon, className }: BtnIconProps) {
  const props = useContext(ctx)
  return <Icon className={variants(props).icon({ className })} />
}
