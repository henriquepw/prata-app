import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@ui/form-control"
import { AlertCircleIcon } from "lucide-react-native"

export type FieldProps = {
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  label?: string
  error?: string
}

type Props = FieldProps & {
  children: React.ReactNode
}
export function Field({ label, children, error, ...rest }: Props) {
  return (
    <FormControl size="md" isInvalid={!!error} {...rest}>
      {label && (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      )}

      {children}

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} size="sm" />
        <FormControlErrorText>{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
