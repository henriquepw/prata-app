import { useNavigation } from "expo-router"
import { PlusIcon, SaveIcon } from "lucide-react-native"
import { useState } from "react"
import { ScrollView } from "react-native"
import { z } from "zod"
import { OutcomeInput } from "~/shared/components/features/transations/outcome-input"
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
  receivedAt: new Date(),
  items: [emptyItem()],
}

export default function RegisterIncomePage() {
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
          balanceId: undefined,
          receivedAt: value.receivedAt,
          type: TransactionType.INCOME,
          amount: Number(getOnlyDigits(i.amount)),
          description: i.description,
        })),
      )

      navigation.goBack()
    },
  })

  return (
    <ScreenRoot>
      <ScreenHeader title="Registrar Entradas" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box className="flex-grow gap-4">
          <form.AppField name="receivedAt">
            {(field) => <field.DateInput label="Data" />}
          </form.AppField>

          <Box className="gap-3">
            <Heading className="font-medium">Entradas</Heading>
            <form.Field name="items" mode="array">
              {(field) => (
                <>
                  {field.state.value.map((v, i) => (
                    <form.Field key={v.localId} name={`items[${i}]`}>
                      {(sub) => (
                        <OutcomeInput
                          index={i}
                          isFocused={i === focusedIndex}
                          value={sub.state.value}
                          onChange={sub.handleChange}
                          onRemove={() => field.removeValue(i)}
                          onBlur={sub.handleBlur}
                          onFocus={() => setFocusedIndex(i)}
                          onEnd={() => {
                            setFocusedIndex(i + 1)
                            if (field.state.value.length === i + 1) {
                              field.pushValue(emptyItem())
                            }
                          }}
                        />
                      )}
                    </form.Field>
                  ))}
                  <Button
                    size="xs"
                    className="mt-2 ml-auto"
                    onPress={() => field.pushValue(emptyItem())}
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
          <form.SubmitButton leftIcon={SaveIcon} className="mt-6 ml-auto">
            Registrar
          </form.SubmitButton>
        </form.AppForm>
        <Box className="h-10" />
      </ScrollView>
    </ScreenRoot>
  )
}
