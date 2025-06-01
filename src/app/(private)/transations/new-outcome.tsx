import { PlusIcon, SaveIcon } from "lucide-react-native"
import { useState } from "react"
import { ScrollView } from "react-native"
import { z } from "zod"
import { BalanceSelect } from "~/components/features/balance/balance-select"
import { OutcomeInput } from "~/components/features/transations/outcome-input"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { useAppForm } from "~/components/ui/form"
import { Heading } from "~/components/ui/heading"
import { ScreenHeader, ScreenRoot } from "~/components/ui/layouts/screen"
import { newId } from "~/utils/id"

const validator = z.object({
  balanceId: z.string(),
  receivedAt: z.date().optional(),
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
  const [focusedIndex, setFocusedIndex] = useState(0)
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: validator,
    },
    onSubmit: async ({ value }) => {
      console.info(
        value.items.filter((v) => v.amount !== "0,00" && v.amount !== ""),
      )
    },
  })

  return (
    <ScreenRoot>
      <ScreenHeader title="Registrar Saídas" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box className="flex-grow gap-4">
          <form.AppField name="receivedAt">
            {(field) => <field.DateInput label="Data" />}
          </form.AppField>

          <form.Field name="balanceId">
            {(field) => (
              <BalanceSelect
                errors={field.state.meta.errors}
                value={field.state.value}
                onChange={(v) => field.handleChange(v || "")}
              />
            )}
          </form.Field>

          <Box className="gap-3">
            <Heading className="font-medium">Gastos</Heading>
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
