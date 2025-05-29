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
} from "~/components/ui/select"
import { useToggle } from "~/hooks/use-toggle"
import { formatDate } from "~/utils/format-date"
import { useFieldContext } from "../context"
import { Field, FieldProps } from "../field"

interface Props extends FieldProps {
  value: Date
  onChange: (value: Date) => void
}
export function DateInput({ value, onChange, ...rest }: Props) {
  const [open, toggleOpen] = useToggle()

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
                toggleOpen()
              }}
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
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
