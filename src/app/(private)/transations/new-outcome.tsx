import { PlusIcon, SaveIcon, Trash2Icon } from "lucide-react-native"
import { z } from "zod"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { useAppForm } from "~/components/ui/form"
import { MoneyPrefix } from "~/components/ui/form/prefix"
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

const defaultValues: z.input<typeof validator> = {
  balanceId: "",
  receivedAt: new Date(),
  items: [
    {
      localId: newId(),
      amount: "0,00",
      description: "",
    },
  ],
}

export default function RegisterOutcomePage() {
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
      <ScreenHeader title="Registrar Saídas" />

      <Box className="flex-grow gap-4">
        <form.AppField name="receivedAt">
          {(field) => <field.DateInput label="Data" />}
        </form.AppField>

        <form.AppField name="balanceId">
          {(field) => <field.Input label="Balanço" />}
        </form.AppField>

        <Box className="gap-2">
          <Heading className="font-medium">Gastos</Heading>
          <form.Field name="items" mode="array">
            {(field) => (
              <>
                <Card>
                  {field.state.value.map((v, i) => (
                    <Box key={v.localId} className="flex-row gap-2">
                      <Box className="w-1/3">
                        <form.AppField name={`items[${i}].amount`}>
                          {(field) => (
                            <field.Input
                              placeholder="0,00"
                              mask="MONEY"
                              prefix={
                                <MoneyPrefix className="font-normal text-lg" />
                              }
                            />
                          )}
                        </form.AppField>
                      </Box>
                      <Box className="flex-1">
                        <form.AppField name={`items[${i}].description`}>
                          {(field) => (
                            <field.Input placeholder="Descrição..." />
                          )}
                        </form.AppField>
                      </Box>
                      <Button
                        action="negative"
                        variant="link"
                        className="p-0"
                        onPress={() => field.removeValue(i)}
                      >
                        <ButtonIcon as={Trash2Icon} />
                      </Button>
                    </Box>
                  ))}
                </Card>
                <Button
                  size="xs"
                  className="ml-auto"
                  onPress={() =>
                    field.pushValue({
                      localId: newId(),
                      amount: "0,00",
                      description: "",
                    })
                  }
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
        <form.SubmitButton leftIcon={SaveIcon} className="mb-4 ml-auto">
          Registrar
        </form.SubmitButton>
      </form.AppForm>
    </ScreenRoot>
  )
}
