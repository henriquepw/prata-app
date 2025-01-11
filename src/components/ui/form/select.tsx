import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { cn } from "~/src/utils/cn"
import { Field, FieldProps } from "./field"

type Props<O> = FieldProps & {
  options: O[]
  getLabel: (o: O) => React.ReactNode
  getValue: (o: O) => string
  value: O
  onChange: (value: O) => void
  children: (o: O) => JSX.Element
}

export function Select<O>({
  value,
  getLabel,
  getValue,
  onChange,
  options,
  children,
  ...rest
}: Props<O>) {
  const [open, setOpen] = useState(false)

  function openPicker() {
    setOpen((s) => !s)
  }

  return (
    <View className="relative">
      <Field asChild {...rest}>
        <Pressable onPress={openPicker} className="bg-neutrala-action">
          <Text className="flex-1 text-neutral-normal text-xl">
            {getLabel(value)}
          </Text>
          <Feather name="chevron-down" className="text-2xl text-neutral-dim" />
        </Pressable>
      </Field>

      <View
        className={cn(
          open ? "absolute" : "hidden",
          "top-full z-50 m-auto mt-4 rounded-xl border border-neutral-dim bg-primary-app p-4 shadow shadow-neutrala-3 dark:shadow-neutraldarka-4",
        )}
      >
        {options.map((o) => children(o))}
      </View>
    </View>
  )
}

export function SelectItem() {
  return <Text>TODO</Text>
}
