import type { Recurrence } from "./types"

export const useSelectedRecurrence = (): Recurrence | null => null

export const useSelectRecurrence = () => (_r: Recurrence) => {}

export const useUnselectedRecurrence = () => () => {}
