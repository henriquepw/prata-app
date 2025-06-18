import type { ISelectItemProps } from "@gluestack-ui/select/lib/types"
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
} from "~/shared/components/ui/select"
import { useToggle } from "~/shared/hooks/use-toggle"
import { Glass } from "../../glass"
import { useFieldContext } from "../context"
import { Field, type FieldProps } from "../field"

export interface SelectProps extends FieldProps {
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
}: SelectProps) {
  const [isOpen, toggleOpen] = useToggle()

  return (
    <Field {...rest}>
      <UISelect
        closeOnOverlayClick
        initialLabel={initialLabel}
        onClose={toggleOpen}
        onValueChange={onChange}
        selectedValue={value}
      >
        <Glass>
          <SelectTrigger
            className="gap-2 rounded-lg px-2 active:opacity-50"
            onPress={toggleOpen}
            size="md"
            variant="outline"
          >
            <SelectInput
              className="flex-1 px-0"
              placeholder="Selecione uma opção"
            />
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
        </Glass>

        <SelectPortal isOpen={isOpen} onClose={toggleOpen} useRNModal>
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

type FormSelectProps = Omit<SelectProps, "onChange" | "value">
export default function FormSelect(props: FormSelectProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <Select
      {...props}
      errors={errors}
      onChange={(v) => field.handleChange(v || "")}
      value={field.state.value}
    />
  )
}
