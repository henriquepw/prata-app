import { Field } from "~/shared/components/ui/form/field"
import {
  Select,
  SelectItem,
  type SelectProps,
} from "~/shared/components/ui/form/fields/select"
import { Skeleton } from "~/shared/components/ui/skeleton"
import { useBalance } from "~/shared/store/slices/balance"

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
