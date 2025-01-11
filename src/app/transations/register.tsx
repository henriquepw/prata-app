import { Feather } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { DatePicker } from "~/components/ui/form/date-input"
import { Input } from "~/components/ui/form/input"
import { AddIcon } from "~/components/ui/icons"
import { useTransationStore } from "~/store/transation-store"
import { formatAmount } from "~/utils/format-amount"

export default function RegisterTransationScreen() {
  const navigate = useNavigation()
  const [amount, setAmount] = useState("0,00")
  const [receivedAt, setReceivedAt] = useState(new Date())
  const addTransation = useTransationStore((s) => s.addTransation)

  function updateCurrency(input: string) {
    const nums = Number(input.replace(/[^0-9]/g, ""))
    setAmount(formatAmount(nums, false))
  }

  function createIncome() {
    addTransation({
      amount: Number(amount.replace(/[^0-9]/g, "")),
      type: "INCOME",
      dueAt: receivedAt,
    })
    navigate.goBack()
  }

  return (
    <SafeAreaView className="flex-1 gap-6 bg-neutral-2 p-4 dark:bg-neutraldark-1">
      <View className="flex-row items-center gap-4 py-4">
        <TouchableOpacity className="w-6" onPress={navigate.goBack}>
          <Feather
            name="chevron-left"
            className="color-neutral-12 dark:color-neutraldark-12 text-2xl"
          />
        </TouchableOpacity>
        <Text className="color-neutral-12 dark:color-neutraldark-12 font-bold text-2xl">
          Nova Entrada
        </Text>
      </View>
      <DatePicker
        required
        label="Data do Recebimento"
        value={receivedAt}
        onChange={setReceivedAt}
      />
      <Input
        required
        error="sajhdkasjdk"
        label="Quanto foi?"
        keyboardType="numeric"
        placeholder="0,00"
        value={amount}
        onChangeText={updateCurrency}
        prefix={
          <Text className="mr-2 font-bold text-gray-normal text-xl">R$</Text>
        }
      />
      <Button className="mt-4 ml-auto" onPress={createIncome}>
        <ButtonIcon icon={AddIcon} />
        <ButtonText>Registrar</ButtonText>
      </Button>
    </SafeAreaView>
  )
}
