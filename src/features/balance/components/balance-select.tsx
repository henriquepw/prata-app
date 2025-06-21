import { useBalance } from "~/features/balance/store/balance"
import { Field } from "~/shared/components/form/field"
import {
  Select,
  SelectItem,
  type SelectProps,
} from "~/shared/components/form/fields/select"
import { Skeleton } from "~/shared/components/skeleton"

export function BalanceSelect(props: Omit<SelectProps, "children">) {
  const balance = useBalance()
  if (balance.isPending) {
    return (
      <Field label="Balanço" {...props}>
        <Skeleton className="h-10 rounded" />
      </Field>
    )
  }

  return (
    <Select label="Balanço" {...props}>
      {balance.data?.pieces.map((p) => (
        <SelectItem key={p.id} label={p.label} value={p.id} />
      ))}
    </Select>
  )
}
