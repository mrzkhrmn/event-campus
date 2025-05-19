import { router, Stack } from "expo-router";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="campus" />
        <Stack.Screen name="terms-conditions" />
      </Stack>
    </Provider>
  );
}
