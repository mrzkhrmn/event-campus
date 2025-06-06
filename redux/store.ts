import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import { baseApi } from "./api/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
      immutableCheck: false,
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
