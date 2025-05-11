import { Trash2Icon } from "lucide-react-native"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
} from "~/components/ui/actionsheet"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { useTransationStore } from "~/store/slices/transation"
import { formatAmount } from "~/utils/format-amount"
import { formatDate } from "~/utils/format-date"

export function TransationDetail() {
  const transation = useTransationStore((s) => s.selected)
  const cleanSelect = useTransationStore((s) => s.cleanSelect)

  return (
    <Actionsheet
      closeOnOverlayClick
      isOpen={!!transation}
      onClose={cleanSelect}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent className="px-0">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {!!transation && (
          <ActionsheetItem className="flex-col">
            <Box className="flex-row">
              <Heading className="mb-4 flex-1 text-2xl">
                Detalhes da Entrada
              </Heading>
              <Button
                size="sm"
                action="negative"
                className="h-8 w-8 items-center justify-center p-0"
              >
                <ButtonIcon as={Trash2Icon} />
              </Button>
            </Box>
            <Box className="mb-2 flex-row justify-between">
              <Text className="flex-1 font-medium text-lg text-neutral-dim">
                Valor
              </Text>
              <Text className="font-medium text-green-dim text-xl">
                {formatAmount(transation.amount)}
              </Text>
            </Box>
            <Box className="flex-row justify-between">
              <Text className="flex-1 font-medium text-lg text-neutral-dim">
                Data do Recebimento
              </Text>
              <Text className="font-medium text-neutral-normal text-xl">
                {formatDate(transation.dueAt)}
              </Text>
            </Box>
          </ActionsheetItem>
        )}
        <SafeAreaView />
      </ActionsheetContent>
    </Actionsheet>
  )
}
