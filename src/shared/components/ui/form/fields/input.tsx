import { useStore } from "@tanstack/react-form"
import { forwardRef } from "react"
import type { TextInput } from "react-native"
import {
  type IInputFieldProps,
  type IInputProps,
  InputField,
  Input as UIInput,
} from "~/shared/components/ui/input"
import { cn } from "~/shared/utils/cn"
import { formatAmount, getOnlyDigits } from "~/shared/utils/format-amount"
import { useFieldContext } from "../context"
import { Field, type FieldProps } from "../field"

type InputMask = "MONEY" | "NUM"

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
      switch (mask) {
        case "MONEY": {
          value = formatAmount(+getOnlyDigits(str), false)
          break
        }
        case "NUM": {
          value = getOnlyDigits(str)
        }
      }

      onChangeText?.(value)
    }

    return (
      <Field
        errors={errors}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        label={label}
      >
        <UIInput
          size="md"
          {...conteinerProps}
          className={cn(
            "gap-2 px-2 text-neutral-500",
            isActive && "border-primary-500",
            conteinerProps.className,
          )}
          variant={rest.variant}
        >
          {prefix}
          <InputField
            className={cn("px-0", className)}
            onChangeText={updateText}
            ref={ref as any}
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
      onBlur={field.handleBlur}
      onChangeText={field.handleChange}
      value={String(field.state.value || "")}
    />
  )
})
