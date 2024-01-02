import {NEW_BASE_URL, BASE_HEADERS} from "../../../config/dataService";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEW_BASE_URL}/products`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Products"],
  endpoints: ({query, mutation}) => ({
    getProducts: query({
      query: (data) => `/?${new URLSearchParams(data)}`,
      providesTags: ["Products"],
    }),
    getFavoriteProducts: query({
      query: (data) => `/wishlist/?${new URLSearchParams(data)}`,
      providesTags: ["Products"],
    }),
    toggleFavorite: mutation({
      query: (data) => ({
        url: `/wishlist/?${new URLSearchParams(data)}`,
        method: "PUT",
      }),
      invalidatesTags: ["Products"],
    }),
    getProductsDetails: query({
      query: (data) => `/details/${new URLSearchParams(data)}`,
      providesTags: ["Products"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useGetFavoriteProductsQuery,
  useToggleFavoriteMutation,
} = productsApi;
