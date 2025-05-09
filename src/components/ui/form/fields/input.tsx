import { useStore } from "@tanstack/react-form"
import { forwardRef } from "react"
import { TextInput } from "react-native"
import {
  IInputFieldProps,
  IInputProps,
  InputField,
  Input as UIInput,
} from "~/components/ui/input"
import { cn } from "~/utils/cn"
import { useFieldContext } from "../context"
import { Field, FieldProps } from "../field"
import { formatAmount, getOnlyDigits } from "~/utils/format-amount"

type InputMask = "MONEY"

interface Props extends FieldProps, IInputFieldProps {
  prefix?: React.ReactNode
  sufix?: React.ReactNode
  isDirty?: boolean
  conteinerProps?: IInputProps
  mask?: InputMask
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
      conteinerProps = {},
      mask,
      onChangeText,
      ...rest
    },
    ref,
  ) => {
    const isActive = isDirty && !errors?.length

    const updateText = (str: string) => {
      let value = str
      if (!mask) return

      switch (mask) {
        case "MONEY": {
          value = formatAmount(+getOnlyDigits(str), false)
        }
      }

      onChangeText?.(value)
    }

    return (
      <Field
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        label={label}
        errors={errors}
      >
        <UIInput
          size="xl"
          {...conteinerProps}
          variant={rest.variant}
          className={cn(
            "gap-2 px-2 text-neutral-500",
            isActive && "border-primary-500",
            conteinerProps.className,
          )}
        >
          {prefix}
          <InputField
            size="xl"
            ref={ref as any}
            className={cn("px-0", className)}
            onChangeText={updateText}
            {...rest}
          />
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
