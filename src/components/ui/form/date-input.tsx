import DateTimePicker from "@react-native-community/datetimepicker"
import { ChevronDownIcon } from "lucide-react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native"
import {
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
  Select as UISelect,
} from "~/components/ui/select"
import { formatDate } from "~/utils/format-date"
import { Field, FieldProps } from "./field"

type Props = FieldProps & {
  value: Date
  onChange: (value: Date) => void
}
export function DatePicker({ value, onChange, ...rest }: Props) {
  const [open, setOpen] = useState(false)
  function toggleOpen() {
    setOpen((s) => !s)
  }

  return (
    <Field {...rest}>
      <UISelect closeOnOverlayClick onClose={toggleOpen}>
        <SelectTrigger
          size="md"
          variant="outline"
          className="gap-2 rounded-lg px-2 active:opacity-50"
          onPress={toggleOpen}
        >
          <SelectInput
            value={value && formatDate(value.toISOString())}
            placeholder="Selecione uma opção"
            className="flex-1 px-0"
          />
          <SelectIcon as={ChevronDownIcon} />
        </SelectTrigger>

        <SelectPortal useRNModal isOpen={open} onClose={toggleOpen}>
          <SelectBackdrop />
          <SelectContent className="my-4 px-0">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <DateTimePicker
              value={value}
              display="inline"
              onChange={(_, newDate) => {
                onChange(newDate || value)
                setOpen(false)
              }}
            />
            <SafeAreaView className="mt-4" />
          </SelectContent>
        </SelectPortal>
      </UISelect>
    </Field>
  )
}
