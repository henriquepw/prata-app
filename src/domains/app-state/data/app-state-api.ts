import { localDb } from "~/store/db"
import type { AppStateItem, AppStateKey } from "~/store/db/app-state"

type AppState = {
  [key in AppStateKey]: string
}

export async function getAppState(): Promise<AppState> {
  const stateValue = localDb.sql<AppStateItem>`SELECT * from app_state`.each()

  const appState = {} as AppState
  for await (const item of stateValue) {
    appState[item.key] = item.value
  }

  return appState
}
