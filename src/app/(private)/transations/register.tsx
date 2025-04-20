import { useNavigation } from "expo-router"
import { ChevronLeftIcon, PlusIcon } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "~/components/ui/background"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { DateInput } from "~/components/ui/form/fields/date-input"
import { Input } from "~/components/ui/form/fields/input"
import { Select, SelectItem } from "~/components/ui/form/fields/select"
import { Icon } from "~/components/ui/icon"
import { TransationType, useTransationStore } from "~/store/transation-store"
import { formatAmount } from "~/utils/format-amount"

export default function RegisterTransationPage() {
  const navigate = useNavigation()
  const [amount, setAmount] = useState("0,00")
  const [receivedAt, setReceivedAt] = useState(new Date())
  const [transationType, setTransationType] = useState<string>()
  const addTransation = useTransationStore((s) => s.addTransation)

  function updateCurrency(input: string) {
    const nums = Number(input.replace(/[^0-9]/g, ""))
    setAmount(formatAmount(nums, false))
  }

  function createTransation() {
    addTransation({
      description: "", // TODO:
      amount: Number(amount.replace(/[^0-9]/g, "")),
      type: transationType as TransationType,
      dueAt: receivedAt,
    })
    navigate.goBack()
  }

  return (
    <Background>
      <SafeAreaView className="gap-6 p-4">
        <View className="flex-row items-center gap-4 py-4">
          <TouchableOpacity className="w-6" onPress={navigate.goBack}>
            <Icon as={ChevronLeftIcon} size="xl" />
          </TouchableOpacity>
          <Text className="font-bold text-2xl text-typography-900">
            Nova Entrada
          </Text>
        </View>

        <Select isRequired label="Tipo" onChange={setTransationType}>
          <SelectItem label="Entrada" value="INCOME" />
          <SelectItem label="Saída" value="OUTCOMe" />
        </Select>
        <DateInput
          isRequired
          label="Data do Recebimento"
          value={receivedAt}
          onChange={setReceivedAt}
        />
        <Input
          isRequired
          label="Quanto foi?"
          keyboardType="numeric"
          placeholder="0,00"
          value={amount}
          onChangeText={updateCurrency}
          prefix={
            <Text className="font-medium text-lg text-typography-900">R$</Text>
          }
        />

        <Button className="mt-4 ml-auto" onPress={createTransation}>
          <ButtonIcon as={PlusIcon} />
          <ButtonText>Registrar</ButtonText>
        </Button>
      </SafeAreaView>
    </Background>
  )
}
