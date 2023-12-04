import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apis/mainApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./states/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);
