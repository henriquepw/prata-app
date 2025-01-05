import { forwardRef } from "react"
import { Pressable, Text } from "react-native"
import { View } from "react-native-reanimated/lib/typescript/Animated"
import { cn } from "~/src/utils/cn"

type BtnProps = {
  children?: React.ReactNode
  className?: string
  onPress?: () => void
}
export const Button = forwardRef(
  ({ children, className, onPress }: BtnProps, ref: React.Ref<View>) => {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        className={cn(
          "flex-row items-center gap-2 rounded-xl bg-primary-action px-3 py-2",
          className,
        )}
      >
        {typeof children === "string" ? (
          <ButtonText>{children}</ButtonText>
        ) : (
          children
        )}
      </Pressable>
    )
  },
)

type BtnTextProps = {
  children: string
  className?: string
}
export function ButtonText({ children, className }: BtnTextProps) {
  return (
    <Text
      className={cn(
        "items-center whitespace-nowrap font-bold text-lg text-primary-dim",
        className,
      )}
    >
      {children}
    </Text>
  )
}

type BtnIconProps = {
  className?: string
  icon: (p: { className?: string }) => JSX.Element
}
export function ButtonIcon({ icon: Icon, className }: BtnIconProps) {
  return <Icon className={cn("text-2xl text-primary-dim", className)} />
}
