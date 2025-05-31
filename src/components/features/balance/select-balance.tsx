import { Field } from "~/components/ui/form/field"
import {
  Select,
  SelectItem,
  SelectProps,
} from "~/components/ui/form/fields/select"
import { Skeleton } from "~/components/ui/skeleton"
import { useBalance } from "~/store/slices/balance"

export function SelectBalance(props: Omit<SelectProps, "children">) {
  const balance = useBalance()
  if (balance.isPending) {
    return (
      <Field isRequired label="Balanço">
        <Skeleton className="h-10 rounded" />
      </Field>
    )
  }

  return (
    <Select isRequired label="Balanço" {...props}>
      {balance.data?.pieces.map((p) => (
        <SelectItem key={p.id} label={p.label} value={p.id} />
      ))}
    </Select>
  )
}
