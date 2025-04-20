import { useStore } from "@tanstack/react-form"
import { forwardRef } from "react"
import { TextInput } from "react-native"
import {
  IInputFieldProps,
  InputField,
  Input as UIInput,
} from "~/components/ui/input"
import { cn } from "~/utils/cn"
import { useFieldContext } from "../contex"
import { Field, FieldProps } from "../field"

interface Props extends FieldProps, IInputFieldProps {
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
      isRequired,
      isReadOnly,
      isDisabled,
      className,
      isDirty,
      errors,
      ...rest
    },
    ref,
  ) => {
    const isActive = isDirty && !errors?.length

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
            isActive && "border-primary-500",
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

type FormInputProps = Omit<
  Props,
  "errors" | "value" | "onBlur" | "onChangeText"
>
export default forwardRef((props: FormInputProps, ref: any) => {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <Input
      ref={ref}
      {...props}
      errors={errors}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChangeText={field.handleChange}
    />
  )
})
