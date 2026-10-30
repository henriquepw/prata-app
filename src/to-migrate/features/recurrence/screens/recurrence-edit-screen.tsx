import { useRouter } from "expo-router"
import { SaveIcon } from "lucide-react-native"
import { z } from "zod"
import { Box } from "~/components/box"
import { useAppForm } from "~/components/form"
import { DateInput } from "~/components/form/fields/date-input"
import { SelectItem } from "~/components/form/fields/select"
import { MoneyPrefix } from "~/components/form/prefix"
import { ScreenHeader, ScreenRoot } from "~/components/layouts/screen"
import { Skeleton } from "~/components/skeleton"
import { Text } from "~/components/text"
import { formatAmount, getOnlyDigits } from "~/lib/format-amount"
import { parseDate } from "~/lib/parse-date"
import { BalanceSelect } from "~/to-migrate/features/balance/components/balance-select"
import { Frequence } from "~/to-migrate/features/recurrence/store/types"
import { TransactionType } from "~/to-migrate/features/transaction/store/types"
import { frequenceLabel } from "../components/frequance-badge"
import {
  useSelectedRecurrence,
  useUnselectedRecurrence,
} from "../store/selected-recurrence"
import { useUpdateRecurrence } from "../store/update-recurrence"

const validator = z.object({
  balanceId: z.string(),
  amount: z.string(),
  description: z.string(),
  frequence: z.nativeEnum(Frequence),
  type: z.nativeEnum(TransactionType),
  endAt: z.date().optional(),
})

export default function RecurrenceEditScreen() {
  const router = useRouter()

  const unselectRecurrence = useUnselectedRecurrence()
  const recurrence = useSelectedRecurrence()
  const updateRecurrence = useUpdateRecurrence()

  const defaultValues: z.output<typeof validator> = {
    amount: formatAmount(recurrence?.amount || 0, false),
    balanceId: recurrence?.categoryId || "",
    description: recurrence?.description || "",
    endAt: parseDate(recurrence?.endAt),
    frequence: Frequence.MONTHLY,
    type: recurrence?.kind || TransactionType.OUTCOME,
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      if (!recurrence) {
        return
      }

      try {
        await updateRecurrence.mutateAsync({
          id: recurrence.id,
          amount: Number(getOnlyDigits(value.amount)),
          description: value.description,
          frequence: value.frequence,
        })
        router.back()
      } catch (e) {
        console.error(e)
      }
    },
  })

  if (!recurrence) {
    return (
      <ScreenRoot>
        <ScreenHeader title="Editar Recorrência" />

        <Box className="gap-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </Box>
      </ScreenRoot>
    )
  }

  return (
    <ScreenRoot>
      <ScreenHeader title="Editar Recorrência" onBack={unselectRecurrence} />

      <Box className="flex-grow gap-4">
        <Box className="w-full flex-row gap-4">
          <form.AppField name="type">
            {(field) => (
              <field.Select
                isRequired
                label="Tipo"
                className="flex-1"
                initialLabel={
                  recurrence.kind === "OUTCOME" ? "Saída" : "Entrada"
                }
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
                initialLabel={frequenceLabel[Frequence.MONTHLY]}
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
          <DateInput
            isReadOnly
            value={parseDate(recurrence.startAt) || new Date()}
            isRequired
            className="flex-1"
            label="Data Inicial"
          />
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
              prefix={<MoneyPrefix className="text-lg font-normal" />}
            />
          )}
        </form.AppField>
      </Box>

      <form.AppForm>
        <form.SubmitButton className="mt-6 ml-auto" leftIcon={SaveIcon}>
          Salvar
        </form.SubmitButton>
      </form.AppForm>
      <Box className="h-10" />
    </ScreenRoot>
  )
}
