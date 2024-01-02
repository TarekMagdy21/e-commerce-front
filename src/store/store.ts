import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./apis/mainApiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./states/authSlice";
import {productsApi} from "./apis/productApi/productApi";
import {cartApi} from "./apis/cartApi/cartApi";
import {orderApi} from "./apis/orderApi/orderApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      productsApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
    ),
  devTools: false,
});

setupListeners(store.dispatch);
