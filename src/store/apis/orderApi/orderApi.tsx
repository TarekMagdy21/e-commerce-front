import {NEW_BASE_URL, BASE_HEADERS} from "../../../config/dataService";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEW_BASE_URL}/orders`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Orders"],
  endpoints: ({query, mutation}) => ({
    getOrders: query({
      query: (data) => `/?${new URLSearchParams(data)}`,
      providesTags: ["Orders"],
    }),
    updateOrder: mutation({
      query: (body) => ({
        url: `/${body.orderId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    addOrder: mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const {useGetOrdersQuery, useUpdateOrderMutation, useAddOrderMutation} = orderApi;
