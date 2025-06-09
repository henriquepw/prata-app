import { SaveIcon } from "lucide-react-native"
import { z } from "zod"
import { BalanceSelect } from "~/components/features/balance/balance-select"
import { Box } from "~/components/ui/box"
import { useAppForm } from "~/components/ui/form"
import { SelectItem } from "~/components/ui/form/fields/select"
import { MoneyPrefix } from "~/components/ui/form/prefix"
import { ScreenHeader, ScreenRoot } from "~/components/ui/layouts/screen"
import { Frequence, useCreateRecurrence } from "~/store/slices/recurrence"
import { TransactionType } from "~/store/slices/transation"
import { getOnlyDigits } from "~/utils/format-amount"

const validator = z.object({
  balanceId: z.string(),
  amount: z.string(),
  description: z.string(),
  frequence: z.nativeEnum(Frequence),
  type: z.nativeEnum(TransactionType),
  endAt: z.date().optional(),
})

const defaultValues: z.input<typeof validator> = {
  amount: "0,00",
  balanceId: "",
  description: "",
  endAt: undefined,
  frequence: Frequence.MONTHLY,
  type: TransactionType.OUTCOME,
}

export default function RegisterRecurrentPage() {
  const createRecurrence = useCreateRecurrence()
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      console.info(value)
      await createRecurrence.mutateAsync({
        amount: Number(getOnlyDigits(value.amount)),
        description: value.description,
        frequence: value.frequence,
        startAt: new Date(),
        type: value.type,
      })
    },
  })

  return (
    <ScreenRoot>
      <ScreenHeader title="Nova Recorrência" />

      <Box className="flex-grow gap-4">
        <form.AppField name="type">
          {(field) => (
            <field.Select isRequired label="Tipo" initialLabel="Saída">
              <SelectItem value={TransactionType.INCOME} label="Entrada" />
              <SelectItem value={TransactionType.OUTCOME} label="SAIDA" />
            </field.Select>
          )}
        </form.AppField>

        <form.AppField name="frequence">
          {(field) => (
            <field.Select isRequired label="Frequência" initialLabel="Mensal">
              <SelectItem value={Frequence.YEARLY} label="Anual" />
              <SelectItem value={Frequence.MONTHLY} label="Mensal" />
              <SelectItem value={Frequence.BIWEEKLY} label="Quinzenal" />
              <SelectItem value={Frequence.WEEKLY} label="Semanal" />
              <SelectItem value={Frequence.DAILY} label="Diario" />
            </field.Select>
          )}
        </form.AppField>

        <BalanceSelect isRequired />

        <form.AppField name="endAt">
          {(field) => <field.DateInput label="Data Final" />}
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

        <form.AppField name="description">
          {(field) => <field.Input label="Descrição" />}
        </form.AppField>
      </Box>

      <form.AppForm>
        <form.SubmitButton leftIcon={SaveIcon} className="mt-6 ml-auto">
          Registrar
        </form.SubmitButton>
      </form.AppForm>
      <Box className="h-10" />
    </ScreenRoot>
  )
}
