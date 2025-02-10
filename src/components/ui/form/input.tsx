import { forwardRef } from "react"
import { TextInput } from "react-native"
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
    isDirty?: boolean
  }

export type InputRef = TextInput

export const Input = forwardRef<TextInput, Props>(
  (
    {
      prefix,
      sufix,
      label,
      errors,
      isDirty,
      isRequired,
      isReadOnly,
      isDisabled,
      className,
      ...rest
    },
    ref,
  ) => {
    const active = isDirty && !errors?.length

    return (
      <Field
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        label={label}
        errors={errors}
      >
        <UIInput
          className={cn(
            "h-10 gap-2 rounded-lg px-2 text-neutral-500",
            active && "border-primary-500",
            className,
          )}
        >
          {prefix}
          <InputField ref={ref as any} className="px-0 text-lg" {...rest} />
          {sufix}
        </UIInput>
      </Field>
    )
  },
)
