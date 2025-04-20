import {
  Button,
  ButtonIcon,
  ButtonProps,
  ButtonSpinner,
  ButtonText,
} from "../../button"
import { useFormContext } from "../contex"

interface Props extends ButtonProps {
  children: string
  icon?: React.ElementType
}

export default function SubmitButton({ children, icon }: Props) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button isDisabled={isSubmitting} onPress={form.handleSubmit}>
          {isSubmitting ? (
            <ButtonSpinner />
          ) : (
            <>
              {icon && <ButtonIcon as={icon} />}
              <ButtonText>{children}</ButtonText>
            </>
          )}
        </Button>
      )}
    </form.Subscribe>
  )
}
