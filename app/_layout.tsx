import { router, Stack } from "expo-router";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import GlobalLoading from "@/components/GlobalLoading";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <GlobalLoading>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(campus)" />
          <Stack.Screen name="terms-conditions" />
          <Stack.Screen name="(chat)" />
        </Stack>
      </GlobalLoading>
    </Provider>
  );
}
