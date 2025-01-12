import { Feather } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { cn } from "~/utils/cn"
import { Field, FieldProps } from "./field"
import { Input } from "@ui/input"

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
      <Field {...rest}>
        <TouchableOpacity onPress={openPicker}>
          <Input className="h-10 gap-2 rounded-lg px-2 py-0">
            <Text className="flex-1 text-lg text-neutral-900">
              {value.toLocaleString()}
            </Text>
            <Feather name="chevron-down" className="text-neutral-600 text-xl" />
          </Input>
        </TouchableOpacity>
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
