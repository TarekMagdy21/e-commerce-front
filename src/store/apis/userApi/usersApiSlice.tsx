// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../mainApiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (data) => `users/data/?${new URLSearchParams(data)}`,
      providesTags: ["Products"],
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{type: "User", id: "LIST"}],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{type: "User", id: arg.id}],
    }),
    deleteUser: builder.mutation({
      query: ({id}) => ({
        url: `/users`,
        method: "DELETE",
        body: {id},
      }),
      invalidatesTags: (result, error, arg) => [{type: "User", id: arg.id}],
    }),
  }),
});
export const {
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
} = usersApiSlice;
