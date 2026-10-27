import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY, // SQLite is authoritative, never stale
      gcTime: Number.POSITIVE_INFINITY,
      retry: 0, // a disk read does not fail from network
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

type Props = {
  children: React.ReactNode
}
export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
