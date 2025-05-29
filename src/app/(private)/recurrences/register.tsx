import { SaveIcon } from "lucide-react-native"
import { z } from "zod"
import { Box } from "~/components/ui/box"
import { useAppForm } from "~/components/ui/form"
import { ScreenHeader, ScreenRoot } from "~/components/ui/layouts/screen"
import { Frequence } from "~/store/slices/recurrence"
import { TransactionType } from "~/store/slices/transation"

const validator = z.object({
  balanceId: z.string(),
  amount: z.string(),
  description: z.string(),
  frequence: z.nativeEnum(Frequence),
  type: z.nativeEnum(TransactionType),
  endAt: z.date().optional(),
})

const defaultValues: z.input<typeof validator> = {
  amount: "",
  balanceId: "",
  description: "",
  endAt: undefined,
  frequence: Frequence.MONTHLY,
  type: TransactionType.OUTCOME,
}

export default function RegisterRecurrentPage() {
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      console.info(value)
    },
  })

  return (
    <ScreenRoot>
      <ScreenHeader title="Nova Recorrência" />

      <Box className="flex-grow gap-4">
        <form.AppField name="type">
          {(field) => <field.Input isRequired label="Tipo" />}
        </form.AppField>

        <form.AppField name="amount">
          {(field) => <field.Input isRequired label="Valor" />}
        </form.AppField>

        <form.AppField name="description">
          {(field) => <field.Input label="Descrição" />}
        </form.AppField>

        <form.AppField name="endAt">
          {(field) => <field.DateInput label="Data Final" />}
        </form.AppField>
      </Box>

      <form.AppForm>
        <form.SubmitButton leftIcon={SaveIcon} className="ml-auto">
          Registrar
        </form.SubmitButton>
      </form.AppForm>
    </ScreenRoot>
  )
}
