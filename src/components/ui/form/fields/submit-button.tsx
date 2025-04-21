import {
  Button,
  ButtonIcon,
  ButtonProps,
  ButtonSpinner,
  ButtonText,
} from "../../button"
import { useFormContext } from "../context"

interface Props extends ButtonProps {
  children: string
  isLoading?: boolean
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
}

export default function SubmitButton({
  children,
  isLoading,
  leftIcon,
  rightIcon,
}: Props) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          isDisabled={isLoading || isSubmitting}
          onPress={form.handleSubmit}
        >
          {isLoading || isSubmitting ? (
            <ButtonSpinner className="text-typography-0" />
          ) : (
            <>
              {leftIcon && <ButtonIcon as={leftIcon} />}
              <ButtonText>{children}</ButtonText>
              {rightIcon && <ButtonIcon as={rightIcon} />}
            </>
          )}
        </Button>
      )}
    </form.Subscribe>
  )
}
