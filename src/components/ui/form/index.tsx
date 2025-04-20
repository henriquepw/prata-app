import { createFormHook } from "@tanstack/react-form"
import { lazy } from "react"
import { fieldContext, formContext } from "./contex"

const DateInput = lazy(() => import("./fields/date-input"))
const Input = lazy(() => import("./fields/input"))
const Select = lazy(() => import("./fields/select"))

const SubmitButton = lazy(() => import("./fields/submit-button"))

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    DateInput,
    Input,
    Select,
  },
  formComponents: {
    SubmitButton,
  },
})
