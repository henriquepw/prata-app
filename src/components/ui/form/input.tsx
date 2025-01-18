import {
  IInputFieldProps,
  InputField,
  Input as UIInput,
} from "~/components/ui/input"
import { cn } from "~/utils/cn"
import { Field, FieldProps } from "./field"

type Props = FieldProps &
  IInputFieldProps & {
    prefix?: React.ReactNode
    sufix?: React.ReactNode
  }

export function Input({
  prefix,
  sufix,
  label,
  error,
  isRequired,
  isReadOnly,
  isDisabled,
  className,
  ...rest
}: Props) {
  return (
    <Field
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      label={label}
      error={error}
    >
      <UIInput
        className={cn("h-10 gap-2 rounded-lg px-2 text-neutral-500", className)}
      >
        {prefix}
        <InputField className="px-0 text-lg" {...rest} />
        {sufix}
      </UIInput>
    </Field>
  )
}
