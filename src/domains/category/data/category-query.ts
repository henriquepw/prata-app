import { queryOptions, useMutation } from "@tanstack/react-query"
import { type CategoryQueryParams, categoryDb } from "./category-db"

const categoryKeys = {
  all: ["categories"],
  list: (query: CategoryQueryParams) => [...categoryKeys.all, query],
} as const

export const categoriesQueryOpts = (query: CategoryQueryParams) =>
  queryOptions({
    queryKey: categoryKeys.list(query),
    queryFn: () => categoryDb.getAll(query),
  })

export function useCreateCategory() {
  return useMutation({
    mutationFn: categoryDb.create,
    meta: {
      errorMessage: "Não foi possível cadastrar a categória",
      invalidateQueries: [categoryKeys.all],
    },
  })
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: categoryDb.update,
    meta: {
      errorMessage: "Não foi possível atualizar a categória",
      invalidateQueries: [categoryKeys.all],
    },
  })
}

export function useRemoveCategory() {
  return useMutation({
    mutationFn: categoryDb.remove,
    meta: {
      errorMessage: "Não foi possível deletar a categória",
      invalidateQueries: [categoryKeys.all],
    },
  })
}
