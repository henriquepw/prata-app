import { XCircleIcon } from "lucide-react-native"
import { useEffect, useRef } from "react"
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated"
import { Box } from "~/components/box"
import { Button, ButtonIcon } from "~/components/button"
import { Input, type InputRef } from "~/components/form/fields/input"
import { MoneyPrefix } from "~/components/form/prefix"
import { Text } from "~/components/text"

const ENTERING = FadeInDown.duration(200)
const EXITING = FadeOutRight.duration(150)
const LAYOUT = LinearTransition.duration(300)

type Outcome = {
  localId: string
  amount: string
  description: string
}

type Props = {
  index: number
  onRemove: () => void
  value?: Outcome
  onChange: (v: Outcome) => void
  onEnd: () => void
  onBlur: () => void
  onFocus: () => void
  isFocused: boolean
}
export function OutcomeInput({
  index,
  value,
  isFocused,
  onChange,
  onRemove,
  onBlur,
  onEnd,
  onFocus,
}: Props) {
  const amountRef = useRef<InputRef>(null)
  const descriptionRef = useRef<InputRef>(null)

  useEffect(() => {
    if (isFocused && !descriptionRef.current?.isFocused()) {
      amountRef.current?.focus()
    }
  }, [isFocused])

  if (!value) {
    return null
  }

  return (
    <Animated.View entering={ENTERING} exiting={EXITING} layout={LAYOUT}>
      <Box className="flex-row items-center gap-3">
        <Box className="ml-2 w-4 justify-end">
          <Text className="self-end text-lg font-bold" numberOfLines={1}>
            {index + 1}.
          </Text>
        </Box>
        <Box className="w-1/4">
          <Input
            mask="MONEY"
            onChangeText={(v) => onChange({ ...value, amount: v })}
            onFocus={onFocus}
            onSubmitEditing={() => isFocused && descriptionRef.current?.focus()}
            placeholder="0,00"
            prefix={<MoneyPrefix className="text-lg font-normal" />}
            ref={amountRef}
            returnKeyType="next"
            value={value.amount}
          />
        </Box>
        <Box className="flex-1">
          <Input
            onBlur={onBlur}
            onChangeText={(v) => onChange({ ...value, description: v })}
            onFocus={onFocus}
            onSubmitEditing={() => isFocused && onEnd()}
            placeholder="Descrição..."
            ref={descriptionRef}
            returnKeyType="next"
            value={value.description}
          />
        </Box>
        <Button
          action="negative"
          className="p-0"
          onPress={onRemove}
          variant="link"
        >
          <ButtonIcon as={XCircleIcon} />
        </Button>
      </Box>
    </Animated.View>
  )
}
