import NetInfo from "@react-native-community/netinfo"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { onlineManager, QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { storage } from "./storage"

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 1000 * 60 * 60 * 24, // 24 hour
      staleTime: 1000 * 60 * 5, // 5 min
      throwOnError: process.env.NODE_ENV === "development",
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
})

const persister = createAsyncStoragePersister({ storage })

type Props = {
  children: React.ReactNode
}
export function StoreProvider({ children }: Props) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
