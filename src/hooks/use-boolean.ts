import { useState } from "react"

export function useBoolean(initial = false) {
  const [isOpen, setOpen] = useState(initial)
  const on = () => setOpen(true)
  const off = () => setOpen(false)

  return [isOpen, on, off] as const
}
