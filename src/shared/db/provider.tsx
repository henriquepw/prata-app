import { SQLiteProvider } from "expo-sqlite"
import { env } from "../env"

type Props = {
  children: React.ReactNode
}
export function DBProvider({ children }: Props) {
  return (
    <SQLiteProvider
      databaseName={env.dbName}
      options={{ libSQLOptions: env.tursor }}
    >
      {children}
    </SQLiteProvider>
  )
}
