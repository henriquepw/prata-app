import { monotonicFactory } from "ulid"

const ulid = monotonicFactory(() => Math.random())

export function newId(): string {
  return ulid()
}
