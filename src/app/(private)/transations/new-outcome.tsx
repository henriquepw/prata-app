import { useNavigation } from "expo-router"
import { PlusIcon, SaveIcon } from "lucide-react-native"
import { useState } from "react"
import { ScrollView } from "react-native"
import { z } from "zod"
import { BalanceSelect } from "~/features/balance/components/balance-select"
import { OutcomeInput } from "~/features/transaction/components/outcome-input"
import { Box } from "~/shared/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/shared/components/ui/button"
import { useAppForm } from "~/shared/components/ui/form"
import { Heading } from "~/shared/components/ui/heading"
import { ScreenHeader, ScreenRoot } from "~/shared/components/ui/layouts/screen"
import {
  TransactionType,
  useCreateTransaction,
} from "~/shared/store/slices/transation"
import { getOnlyDigits } from "~/shared/utils/format-amount"
import { newId } from "~/shared/utils/id"

const validator = z.object({
  balanceId: z.string(),
  receivedAt: z.date(),
  items: z.array(
    z.object({
      localId: z.string(),
      amount: z.string(),
      description: z.string(),
    }),
  ),
})

const emptyItem = () => ({
  localId: newId(),
  amount: "",
  description: "",
})

const defaultValues: z.input<typeof validator> = {
  balanceId: "",
  receivedAt: new Date(),
  items: [emptyItem()],
}

export default function RegisterOutcomePage() {
  const navigation = useNavigation()
  const createTransaction = useCreateTransaction()

  const [focusedIndex, setFocusedIndex] = useState(0)
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      await createTransaction.mutateAsync(
        value.items.map((i) => ({
          balanceId: value.balanceId,
          receivedAt: value.receivedAt,
          type: TransactionType.OUTCOME,
          amount: Number(getOnlyDigits(i.amount)),
          description: i.description,
        })),
      )

      navigation.goBack()
    },
  })

  return (
    <ScreenRoot>
      <ScreenHeader title="Registrar Saídas" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex-grow gap-4">
          <form.AppField name="receivedAt">
            {(field) => <field.DateInput label="Data" />}
          </form.AppField>

          <form.Field name="balanceId">
            {(field) => (
              <BalanceSelect
                errors={field.state.meta.errors}
                onChange={(v) => field.handleChange(v || "")}
                value={field.state.value}
              />
            )}
          </form.Field>

          <Box className="gap-3">
            <Heading className="font-medium">Gastos</Heading>
            <form.Field mode="array" name="items">
              {(field) => (
                <>
                  {field.state.value.map((v, i) => (
                    <form.Field key={v.localId} name={`items[${i}]`}>
                      {(sub) => (
                        <OutcomeInput
                          index={i}
                          isFocused={i === focusedIndex}
                          onBlur={sub.handleBlur}
                          onChange={sub.handleChange}
                          onEnd={() => {
                            setFocusedIndex(i + 1)
                            if (field.state.value.length === i + 1) {
                              field.pushValue(emptyItem())
                            }
                          }}
                          onFocus={() => setFocusedIndex(i)}
                          onRemove={() => field.removeValue(i)}
                          value={sub.state.value}
                        />
                      )}
                    </form.Field>
                  ))}
                  <Button
                    className="mt-2 ml-auto"
                    onPress={() => field.pushValue(emptyItem())}
                    size="xs"
                  >
                    <ButtonIcon as={PlusIcon} />
                    <ButtonText>Adicionar</ButtonText>
                  </Button>
                </>
              )}
            </form.Field>
          </Box>
        </Box>

        <form.AppForm>
          <form.SubmitButton className="mt-6 ml-auto" leftIcon={SaveIcon}>
            Registrar
          </form.SubmitButton>
        </form.AppForm>
        <Box className="h-10" />
      </ScrollView>
    </ScreenRoot>
  )
}
