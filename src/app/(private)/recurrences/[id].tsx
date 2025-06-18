import { useRouter } from "expo-router"
import { SaveIcon } from "lucide-react-native"
import { z } from "zod"
import { BalanceSelect } from "~/shared/components/features/balance/balance-select"
import { Box } from "~/shared/components/ui/box"
import { useAppForm } from "~/shared/components/ui/form"
import { SelectItem } from "~/shared/components/ui/form/fields/select"
import { MoneyPrefix } from "~/shared/components/ui/form/prefix"
import { ScreenHeader, ScreenRoot } from "~/shared/components/ui/layouts/screen"
import { Text } from "~/shared/components/ui/text"
import {
  Frequence,
  useCreateRecurrence,
} from "~/shared/store/slices/recurrence"
import { TransactionType } from "~/shared/store/slices/transation"
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

export default function EditRecurrencePage() {
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
        <form.AppField name="type">
          {(field) => (
            <field.Select initialLabel="Saída" isRequired label="Tipo">
              <SelectItem label="Entrada" value={TransactionType.INCOME} />
              <SelectItem label="SAIDA" value={TransactionType.OUTCOME} />
            </field.Select>
          )}
        </form.AppField>

        <form.AppField name="frequence">
          {(field) => (
            <field.Select initialLabel="Mensal" isRequired label="Frequência">
              <SelectItem label="Anual" value={Frequence.YEARLY} />
              <SelectItem label="Mensal" value={Frequence.MONTHLY} />
              <SelectItem label="Quinzenal" value={Frequence.BIWEEKLY} />
              <SelectItem label="Semanal" value={Frequence.WEEKLY} />
              <SelectItem label="Diario" value={Frequence.DAILY} />
            </field.Select>
          )}
        </form.AppField>

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
