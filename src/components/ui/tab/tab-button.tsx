import { TabTriggerSlotProps } from "expo-router/ui"
import { Ref, forwardRef } from "react"
import { Pressable, View } from "react-native"
import { Icon } from "~/components/ui/icon"
import { cn } from "~/utils/cn"

type Props = TabTriggerSlotProps & {
  icon: React.ElementType
}
export const TabButton = forwardRef(
  ({ icon, children, isFocused, ...props }: Props, ref: Ref<View>) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        className={cn(
          "items-center justify-center rounded-full p-3 transition-all active:opacity-50",
          isFocused && "bg-primary-500",
        )}
      >
        <Icon
          as={icon}
          size="xl"
          className={
            isFocused
              ? "text-typography-0"
              : "text-typography-800 dark:text-typography-900"
          }
        />
      </Pressable>
    )
  },
)
