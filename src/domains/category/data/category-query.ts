import { queryOptions, useMutation } from "@tanstack/react-query"
import {
  type CategoryQueryParams,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./category-db"

const categoryKeys = {
  all: ["categories"],
  list: (query: CategoryQueryParams) => [...categoryKeys.all, query],
} as const

export const categoriesQueryOpts = (query: CategoryQueryParams) =>
  queryOptions({
    queryKey: categoryKeys.list(query),
    queryFn: () => getCategories(query),
  })

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
    meta: {
      errorMessage: "Não foi possível cadastrar a categória",
      invalidateQueries: [categoryKeys.all],
    },
  })
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: updateCategory,
    meta: {
      errorMessage: "Não foi possível atualizar a categória",
      invalidateQueries: [categoryKeys.all],
    },
  })
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategory,
    meta: {
      errorMessage: "Não foi possível deletar a categória",
      invalidateQueries: [categoryKeys.all],
    },
  })
}
