import { newId } from "~/lib/id"
import { localDb } from "~/store/db"
import type { Category, CategoryColor } from "~/store/db/category"

export type CategoryQueryParams = {
  search?: string
}
export async function getAll(query: CategoryQueryParams): Promise<Category[]> {
  return localDb.getAllAsync(
    "SELECT * from categories WHERE name LIKE ?",
    query.search ?? "",
  )
}

type CreateCategoryInput = {
  name: string
  ownerId: string
  color?: CategoryColor
  monthlyLimit?: number
}

async function create(input: CreateCategoryInput): Promise<Category> {
  const now = Date.now().toString()

  const category: Category = {
    id: newId(),
    ownerId: input.ownerId,
    name: input.name,
    color: input.color ?? "GRAY",
    monthlyLimit: input.monthlyLimit ?? 0,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    serverSeq: null,
  }

  await localDb.runAsync(
    `
      INSERT INTO categories (id, name, color, monthlyLimit, ownerId, serverSeq, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
    category.id,
    category.name,
    category.color,
    category.monthlyLimit,
    category.ownerId,
    category.serverSeq,
    category.createdAt,
    category.updatedAt,
  )

  return category
}

async function update(category: Category): Promise<Category> {
  const now = Date.now().toString()
  category.updatedAt = now

  await localDb.runAsync(
    `
      UPDATE categories
      SET
        name = ?,
        color = ?,
        monthlyLimit = ?,
        updatedAt = ?
      WHERE id = ?
  `,
    category.name,
    category.color,
    category.monthlyLimit,
    category.updatedAt,
    category.id,
  )

  return category
}

async function remove(category: Category): Promise<Category> {
  const now = Date.now().toString()
  category.deletedAt = now

  await localDb.runAsync(
    `
      UPDATE categories
      SET deletedAt = ?
      WHERE id = ?
  `,
    category.deletedAt,
    category.id,
  )

  return category
}

export const categoryDb = {
  getAll,
  create,
  update,
  remove,
} as const
