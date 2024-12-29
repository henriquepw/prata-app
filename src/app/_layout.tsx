import "../../assets/global.css";
import { Stack } from "expo-router";
import { StoreProvider } from "../store";

const opts = { headerShown: false };

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack screenOptions={opts} />
    </StoreProvider>
  );
}
