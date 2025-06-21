import DateTimePicker from "@react-native-community/datetimepicker"
import { useStore } from "@tanstack/react-form"
import { ChevronDownIcon } from "lucide-react-native"
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
} from "~/shared/components/select"
import { useToggle } from "~/shared/hooks/use-toggle"
import { formatDate } from "~/shared/utils/format-date"
import { useFieldContext } from "../context"
import { Field, type FieldProps } from "../field"

interface Props extends FieldProps {
  value: Date
  onChange: (value: Date) => void
  className?: string
  placeholder?: string
}
export function DateInput({ value, onChange, placeholder, ...rest }: Props) {
  const [open, toggleOpen] = useToggle()

  return (
    <Field {...rest}>
      <UISelect closeOnOverlayClick onClose={toggleOpen}>
        <SelectTrigger
          className="gap-2 rounded-lg px-2 active:opacity-50"
          onPress={toggleOpen}
          size="md"
          variant="outline"
        >
          <SelectInput
            className="flex-1 px-0"
            placeholder={placeholder}
            value={value && formatDate(value.toISOString())}
          />
          <SelectIcon as={ChevronDownIcon} />
        </SelectTrigger>

        <SelectPortal isOpen={open} onClose={toggleOpen} useRNModal>
          <SelectBackdrop />
          <SelectContent className="my-4 px-0">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <DateTimePicker
              display="inline"
              onChange={(_, newDate) => {
                onChange(newDate || value)
                toggleOpen()
              }}
              value={value || new Date()}
            />
            <SafeAreaView className="mt-4" />
          </SelectContent>
        </SelectPortal>
      </UISelect>
    </Field>
  )
}

type FormDateInputProps = Omit<Props, "onChange" | "value">
export default function FormDateInput(props: FormDateInputProps) {
  const field = useFieldContext<Date>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <DateInput
      {...props}
      errors={errors}
      onChange={field.handleChange}
      value={field.state.value}
    />
  )
}
