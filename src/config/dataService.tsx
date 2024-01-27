import axios from "axios";
import { getCookies } from "cookies-next";
// Select one of the following BASE_URLs

// export const BASE_URL = "http://localhost:3110/api/v1";
// export const BASE_URL = "https://api.edwintheapp.com/api/v1";
//This is the way to import from env in VITE
//And it has to start with VITE_SOMETHING ANYTHING
// console.log(import.meta.env.VITE_BASE_URL_DEVELOPMENT) // 123

export const NEW_BASE_URL = import.meta.env.VITE_BASE_URL_DEVELOPMENT;

export const BASE_HEADERS = (headers: Headers): Headers => {
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${getCookies().token}`);
  headers.set("Accept-Language", "en");
  return headers;
};

export const BASE_AXIOS_HEADERS = () => ({
  Authorization: `Bearer ${getCookies().token}`,
});

export const axiosInstance = axios.create({
  baseURL: NEW_BASE_URL,
  headers: BASE_AXIOS_HEADERS(),
  withCredentials: true,
});
