import { Text, View } from "react-native"
import { useTransationStore } from "~/src/store/transation-store"
import { formatAmount } from "~/src/utils/format-amount"
import { formatDate } from "~/src/utils/format-date"
import { Actionsheet } from "../ui/actionsheet"
import { Button, ButtonIcon } from "../ui/button"
import { DeleteIcon } from "../ui/icons"

export function TransationDetail() {
  const transation = useTransationStore((s) => s.selected)
  const cleanSelect = useTransationStore((s) => s.cleanSelect)

  return (
    <Actionsheet open={!!transation} onClose={cleanSelect}>
      {!!transation && (
        <View>
          <View className="flex-row">
            <Text className="mb-4 flex-1 font-bold text-2xl text-neutral-normal">
              Detalhes da Entrada
            </Text>
            <Button
              size="sm"
              color="denger"
              className="h-8 w-8 items-center justify-center p-0"
            >
              <ButtonIcon icon={DeleteIcon} />
            </Button>
          </View>
          <View className="mb-2 flex-row justify-between">
            <Text className="font-medium text-lg text-neutral-dim">Valor</Text>
            <Text className="font-medium text-green-dim text-xl">
              {formatAmount(transation.amount)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-medium text-lg text-neutral-dim">
              Data do Recebimento
            </Text>
            <Text className="font-medium text-neutral-normal text-xl">
              {formatDate(transation.dueAt)}
            </Text>
          </View>
        </View>
      )}
    </Actionsheet>
  )
}
