import { ISelectItemProps } from "@gluestack-ui/select/lib/types"
import { Field, FieldProps } from "./field"
import {
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
  SelectItem as UISelectItem,
  Select as UISelect,
} from "@ui/select"
import { ChevronDownIcon } from "lucide-react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native"

type Props = FieldProps & {
  children: React.ReactNode
  onChange?: (arg?: string) => void
}

export function Select({ children, onChange, ...rest }: Props) {
  const [isOpen, setOpen] = useState(true)
  function toggleOpen() {
    setOpen((o) => !o)
  }

  return (
    <Field {...rest}>
      <UISelect
        closeOnOverlayClick
        onClose={toggleOpen}
        onValueChange={onChange}
      >
        <SelectTrigger
          size="md"
          variant="outline"
          className="gap-2 rounded-lg px-2"
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

type SelectItemProps = ISelectItemProps & {
  className?: string
}
export function SelectItem(props: SelectItemProps) {
  return <UISelectItem {...props} />
}
