import { ISelectItemProps } from "@gluestack-ui/select/lib/types"
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
  SelectItem as UISelectItem,
} from "~/components/ui/select"
import { useToggle } from "~/hooks/use-toggle"
import { useFieldContext } from "../context"
import { Field, FieldProps } from "../field"

interface Props extends FieldProps {
  children: React.ReactNode
  initialLabel?: string
  onChange?: (arg?: string) => void
  value?: string
}

export function Select({
  initialLabel,
  children,
  value,
  onChange,
  ...rest
}: Props) {
  const [isOpen, toggleOpen] = useToggle()

  return (
    <Field {...rest}>
      <UISelect
        selectedValue={value}
        initialLabel={initialLabel}
        closeOnOverlayClick
        onClose={toggleOpen}
        onValueChange={onChange}
      >
        <SelectTrigger
          size="xl"
          variant="outline"
          className="gap-2 rounded-lg px-2 active:opacity-50"
          onPress={toggleOpen}
        >
          <SelectInput
            placeholder="Selecione uma opção"
            className="flex-1 px-0"
          />
          <SelectIcon as={ChevronDownIcon} />
        </SelectTrigger>

        <SelectPortal useRNModal isOpen={isOpen} onClose={toggleOpen}>
          <SelectBackdrop />
          <SelectContent className="my-4 px-0">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {children}
            <SafeAreaView className="mt-4" />
          </SelectContent>
        </SelectPortal>
      </UISelect>
    </Field>
  )
}

interface SelectItemProps extends ISelectItemProps {
  className?: string
}
export function SelectItem(props: SelectItemProps) {
  return <UISelectItem {...props} />
}

type FormSelectProps = Omit<Props, "onChange" | "value">
export default function FormSelect(props: FormSelectProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <Select
      {...props}
      errors={errors}
      value={field.state.value}
      onChange={(v) => field.handleChange(v || "")}
    />
  )
}
