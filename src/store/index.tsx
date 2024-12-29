import NetInfo from "@react-native-community/netinfo";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { MMKV } from "react-native-mmkv";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      gcTime: 1000 * 60 * 60 * 24, // 24 hour
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});

const storage = new MMKV();
const persister = createAsyncStoragePersister({
  storage: {
    setItem: storage.set,
    removeItem: storage.delete,
    getItem: (key) => {
      const value = storage.getString(key);
      return value !== null ? value : undefined;
    },
  },
});

type Props = {
  children: React.ReactNode;
};
export function StoreProvider({ children }: Props) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
