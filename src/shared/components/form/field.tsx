import { AlertCircleIcon } from "lucide-react-native"
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "~/shared/components/form-control"

type FieldError = any

export type FieldProps = {
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  label?: string
  errors?: FieldError[]
}

type Props = FieldProps & {
  children: React.ReactNode
}
export function Field({ label, children, errors, ...rest }: Props) {
  const isInvalid = !!errors?.length
  const msg = new Set(errors?.map((e) => e?.message))

  return (
    <FormControl isInvalid={isInvalid} size="md" {...rest}>
      {label && (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      )}

      {children}

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} size="sm" />
        <FormControlErrorText>
          {[...msg.values()].join(", ")}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
