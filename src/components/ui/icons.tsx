import { Feather } from "@expo/vector-icons"
import { cssInterop } from "nativewind"
import { cn } from "~/utils/cn"

cssInterop(Feather, {
  className: {
    target: "style",
  },
})

type IconProps = {
  className?: string
}

export function IncomeIcon({ className }: IconProps) {
  return (
    <Feather name="arrow-down-circle" className={cn("text-2xl", className)} />
  )
}

export function OutcomeIcon({ className }: IconProps) {
  return (
    <Feather name="arrow-up-circle" className={cn("text-2xl", className)} />
  )
}

export function AddIcon({ className }: IconProps) {
  return <Feather name="plus" className={cn("text-2xl", className)} />
}

export function DeleteIcon({ className }: IconProps) {
  return <Feather name="trash-2" className={cn("text-2xl", className)} />
}
