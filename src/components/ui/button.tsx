import { Text, View } from "react-native"
import { cn } from "~/src/utils/cn"

type BtnProps = {
  children?: React.ReactNode
  className?: string
}
export function Button({ children, className }: BtnProps) {
  return (
    <View
      className={cn(
        "flex-row items-center gap-2 rounded-xl bg-primary-action px-3 py-2",
        className,
      )}
    >
      {children}
    </View>
  )
}

type BtnTextProps = {
  children: string
  className?: string
}
export function ButtonText({ children, className }: BtnTextProps) {
  return (
    <Text
      className={cn(
        "color-primary-11 dark:color-primarydark-11 flex-1 items-center whitespace-nowrap font-medium",
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
  return (
    <Icon
      className={cn(
        "color-primary-11 dark:color-primarydark-11 text-xl",
        className,
      )}
    />
  )
}
