import { Text, View } from "react-native"
import { Slot } from "@radix-ui/react-slot"

export type FieldProps = {
  required?: boolean
  label?: string
  error?: string
}

type Props = FieldProps & {
  children: React.ReactNode
  asChild?: true
}
export function Field({ label, required, children, error, asChild }: Props) {
  const Comp = asChild ? Slot : View

  return (
    <View className="gap-1">
      {!!label && (
        <Text className="ml-3 font-medium text-neutral-normal text-lg">
          {label}
          {required && <Text className="text-red-dim">{" *"}</Text>}
        </Text>
      )}
      <Comp className="h-10 flex-row items-center rounded-xl bg-neutrala-4 px-3 dark:bg-neutraldarka-4">
        {children}
      </Comp>
      {!!error && <Text className="text-base text-red-dim">{error}</Text>}
    </View>
  )
}
