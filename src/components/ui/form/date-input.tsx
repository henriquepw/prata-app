import { Feather } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { cn } from "~/utils/cn"
import { Field, FieldProps } from "./field"

type Props = FieldProps & {
  value: Date
  onChange: (value: Date) => void
}
export function DatePicker({ value, onChange, ...rest }: Props) {
  const [open, setOpen] = useState(false)

  function openPicker() {
    setOpen((s) => !s)
  }

  return (
    <View className="relative">
      <Field asChild {...rest}>
        <Pressable onPress={openPicker} className="bg-neutrala-action">
          <Text className="flex-1 text-neutral-normal text-xl">
            {value.toLocaleString()}
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
        <DateTimePicker
          value={value}
          display="inline"
          accentColor=""
          onChange={(_, newDate) => {
            onChange(newDate || value)
            setOpen(false)
          }}
        />
      </View>
    </View>
  )
}
