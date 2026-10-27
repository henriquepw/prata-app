import { newId } from "~/lib/id"
import { localDb } from "~/store/db"
import type { Category, CategoryColor } from "~/store/db/category"

export async function getCategories(): Promise<Category[]> {
  return localDb.getAllAsync("SELECT * from categories")
}

type CreateCategoryInput = {
  name: string
  color?: CategoryColor
  monthlyLimit?: number
}

export async function createCategory(
  input: CreateCategoryInput,
): Promise<Category> {
  const now = Date.now().toString()

  const category: Category = {
    id: newId(),
    name: input.name,
    color: input.color ?? "GRAY",
    monthlyLimit: input.monthlyLimit || 0,
    ownerId: "",
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    serverSeq: null,
  }

  await localDb.runAsync("INSERT into categories values ()")

  return category
}
