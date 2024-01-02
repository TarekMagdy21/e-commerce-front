import {NEW_BASE_URL, BASE_HEADERS} from "../../../config/dataService";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEW_BASE_URL}/cart`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Cart"],
  endpoints: ({query, mutation}) => ({
    getCartItems: query({
      query: (data) => `/?${new URLSearchParams(data)}`,
      providesTags: ["Cart"],
    }),
    addToCart: mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: mutation({
      query: (body) => ({
        url: `/remove`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    reduceQuantity: mutation({
      query: (body) => ({
        url: `/reduce-quantity`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: mutation({
      query: (body) => ({
        url: `/clear-cart`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useReduceQuantityMutation,
  useRemoveFromCartMutation,useClearCartMutation
} = cartApi;
