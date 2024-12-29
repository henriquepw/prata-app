import "../../assets/global.css";
import { Stack } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { StoreProvider } from "../store";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const opts = { headerShown: false };

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack screenOptions={opts} />
    </StoreProvider>
  );
}
