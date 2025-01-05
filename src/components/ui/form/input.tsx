import { TextInput, TextInputProps } from "react-native"
import { Field, FieldProps } from "./field"
import { cn } from "~/src/utils/cn"

type Props = FieldProps &
  TextInputProps & {
    prefix?: React.ReactNode
    sufix?: React.ReactNode
  }
export function Input({
  prefix,
  sufix,
  required,
  label,
  error,
  ...rest
}: Props) {
  return (
    <Field required={required} label={label} error={error}>
      {prefix}
      <TextInput
        placeholder="todo"
        {...rest}
        className={cn(
          "mt-1 h-10 flex-1 text-neutral-normal text-xl leading-none placeholder:text-neutrala-10 dark:placeholder:text-neutraldarka-10",
          rest.className,
        )}
      />
      {sufix}
    </Field>
  )
}
