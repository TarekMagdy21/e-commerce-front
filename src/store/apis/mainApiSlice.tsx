import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../states/authSlice";
import { NEW_BASE_URL } from "@/config/dataService";
const baseQuery = fetchBaseQuery({
  baseUrl: NEW_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // @ts-ignore
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
// @ts-ignore

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result: any = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      // @ts-ignore
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        // @ts-ignore
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  // @ts-ignore
  endpoints: (builder) => ({}),
});
