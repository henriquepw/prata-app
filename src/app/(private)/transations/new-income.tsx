import { useRouter } from "expo-router"
import { ChevronLeftIcon, PlusIcon } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { z } from "zod"
import { Background } from "~/components/ui/background"
import { useAppForm } from "~/components/ui/form"
import { SelectItem } from "~/components/ui/form/fields/select"
import { Icon } from "~/components/ui/icon"
import {
  TransactionType,
  useCreateTransaction,
} from "~/store/slices/transation"
import { getOnlyDigits } from "~/utils/format-amount"

const schema = z.object({
  amount: z.string(),
  balanceId: z.string(),
  type: z.nativeEnum(TransactionType),
  description: z.string(),
  receivedAt: z.date(),
})

export default function RegisterTransationPage() {
  const router = useRouter()
  const createTransaction = useCreateTransaction()

  const form = useAppForm({
    defaultValues: {
      amount: "",
      balanceId: "",
      description: "",
      type: TransactionType.OUTCOME,
      receivedAt: new Date(),
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      await createTransaction.mutateAsync({
        balanceId: value.balanceId,
        type: value.type as TransactionType,
        amount: Number(getOnlyDigits(value.amount)),
        description: value.description,
        receivedAt: value.receivedAt,
      })
      console.log("aaaaaaaaa")
      router.back()
    },
  })

  return (
    <Background>
      <SafeAreaView className="gap-6 p-4">
        <View className="flex-row items-center gap-4 py-4">
          <TouchableOpacity className="w-6" onPress={router.back}>
            <Icon as={ChevronLeftIcon} size="xl" />
          </TouchableOpacity>
          <Text className="font-bold text-2xl text-typography-900">
            Novo Registro
          </Text>
        </View>

        {/* TODO: balance select */}
        {/* TODO: change trx type input style */}

        <form.AppField name="type">
          {(field) => (
            <field.Select isRequired label="Tipo">
              <SelectItem label="Entrada" value="INCOME" />
              <SelectItem label="Saída" value="OUTCOME" />
            </field.Select>
          )}
        </form.AppField>

        <form.AppField name="receivedAt">
          {(field) => (
            <field.DateInput isRequired label="Data do Recebimento" />
          )}
        </form.AppField>

        <form.AppField name="amount">
          {(field) => (
            <field.Input
              isRequired
              label="Quanto foi?"
              keyboardType="numeric"
              placeholder="0,00"
              mask="MONEY"
              prefix={
                <Text className="font-medium text-lg text-typography-900">
                  R$
                </Text>
              }
            />
          )}
        </form.AppField>

        <form.AppField name="description">
          {(field) => <field.Input label="Descrição" />}
        </form.AppField>

        <form.AppForm>
          <form.SubmitButton leftIcon={PlusIcon}>Registrar</form.SubmitButton>
        </form.AppForm>
      </SafeAreaView>
    </Background>
  )
}
