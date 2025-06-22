import { useRouter } from "expo-router"
import { SaveIcon } from "lucide-react-native"
import { z } from "zod"
import { BalanceSelect } from "~/features/balance/components/balance-select"
import { useCreateRecurrence } from "~/features/recurrence/store/create-recurrence"
import { Frequence } from "~/features/recurrence/store/types"
import { TransactionType } from "~/features/transaction/store/transation"
import { Box } from "~/shared/components/box"
import { useAppForm } from "~/shared/components/form"
import { SelectItem } from "~/shared/components/form/fields/select"
import { MoneyPrefix } from "~/shared/components/form/prefix"
import { ScreenHeader, ScreenRoot } from "~/shared/components/layouts/screen"
import { Text } from "~/shared/components/text"
import { getOnlyDigits } from "~/shared/utils/format-amount"

const validator = z.object({
  balanceId: z.string(),
  amount: z.string(),
  description: z.string(),
  frequence: z.nativeEnum(Frequence),
  type: z.nativeEnum(TransactionType),
  startAt: z.date(),
  endAt: z.date().optional(),
})

const defaultValues: z.input<typeof validator> = {
  amount: "0,00",
  balanceId: "",
  description: "",
  startAt: new Date(),
  endAt: undefined,
  frequence: Frequence.MONTHLY,
  type: TransactionType.OUTCOME,
}

export function RecurrenceRegisterScreen() {
  const router = useRouter()
  const createRecurrence = useCreateRecurrence()
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      await createRecurrence.mutateAsync({
        amount: Number(getOnlyDigits(value.amount)),
        description: value.description,
        frequence: value.frequence,
        startAt: value.startAt,
        type: value.type,
      })
      router.back()
    },
  })

  return (
    <ScreenRoot>
      <ScreenHeader title="Nova Recorrência" />

      <Box className="flex-grow gap-4">
        <Box className="w-full flex-row gap-4">
          <form.AppField name="type">
            {(field) => (
              <field.Select
                isRequired
                label="Tipo"
                className="flex-1"
                initialLabel="Saída"
              >
                <SelectItem label="Entrada" value={TransactionType.INCOME} />
                <SelectItem label="SAIDA" value={TransactionType.OUTCOME} />
              </field.Select>
            )}
          </form.AppField>

          <form.AppField name="frequence">
            {(field) => (
              <field.Select
                isRequired
                label="Frequência"
                className="flex-1"
                initialLabel="Mensal"
              >
                <SelectItem label="Anual" value={Frequence.YEARLY} />
                <SelectItem label="Mensal" value={Frequence.MONTHLY} />
                <SelectItem label="Quinzenal" value={Frequence.BIWEEKLY} />
                <SelectItem label="Semanal" value={Frequence.WEEKLY} />
                <SelectItem label="Diario" value={Frequence.DAILY} />
              </field.Select>
            )}
          </form.AppField>
        </Box>

        <BalanceSelect isRequired />

        <Box className="flex-row items-end gap-4">
          <form.AppField name="startAt">
            {(field) => (
              <field.DateInput
                className="flex-1"
                isRequired
                label="Data Inicial"
              />
            )}
          </form.AppField>
          <Text className="leading-10">Até</Text>
          <form.AppField name="endAt">
            {(field) => (
              <field.DateInput
                className="flex-1"
                label="Data Final"
                placeholder="Sem fim"
              />
            )}
          </form.AppField>
        </Box>

        <form.AppField name="description">
          {(field) => <field.Input label="Descrição" />}
        </form.AppField>

        <form.AppField name="amount">
          {(field) => (
            <field.Input
              isRequired
              label="Valor"
              mask="MONEY"
              prefix={<MoneyPrefix className="font-normal text-lg" />}
            />
          )}
        </form.AppField>
      </Box>

      <form.AppForm>
        <form.SubmitButton className="mt-6 ml-auto" leftIcon={SaveIcon}>
          Registrar
        </form.SubmitButton>
      </form.AppForm>
      <Box className="h-10" />
    </ScreenRoot>
  )
}
