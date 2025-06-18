import { useState } from "react"

export function useToggle(initial = false) {
  const [isOpen, setOpen] = useState(initial)
  const toggle = () => setOpen((o) => !o)

  return [isOpen, toggle] as const
}
