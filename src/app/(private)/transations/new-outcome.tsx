import { PlusIcon, SaveIcon, XCircleIcon } from "lucide-react-native"
import { ScrollView } from "react-native"
import Animated, {
  FadeInDown,
  LinearTransition,
  FadeOutRight,
} from "react-native-reanimated"
import { z } from "zod"
import { BalanceSelect } from "~/components/features/balance/balance-select"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button"
import { useAppForm } from "~/components/ui/form"
import { MoneyPrefix } from "~/components/ui/form/prefix"
import { Heading } from "~/components/ui/heading"
import { ScreenHeader, ScreenRoot } from "~/components/ui/layouts/screen"
import { Text } from "~/components/ui/text"
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
                    <Animated.View
                      key={v.localId}
                      exiting={FadeOutRight}
                      entering={FadeInDown}
                      layout={LinearTransition.duration(500)}
                    >
                      <Box className="flex-row items-center gap-3">
                        <Box className="ml-2 w-4 justify-end">
                          <Text
                            className="self-end font-bold text-lg"
                            numberOfLines={1}
                          >
                            {i + 1}.
                          </Text>
                        </Box>
                        <Box className="w-1/4">
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
                          <ButtonIcon as={XCircleIcon} />
                        </Button>
                      </Box>
                    </Animated.View>
                  ))}
                  <Button
                    size="xs"
                    className="mt-2 ml-auto"
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
          <form.SubmitButton leftIcon={SaveIcon} className="mt-6 ml-auto">
            Registrar
          </form.SubmitButton>
        </form.AppForm>
        <Box className="h-10" />
      </ScrollView>
    </ScreenRoot>
  )
}
