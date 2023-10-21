import { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    BaseQueryApi,
    unknown
  > =>
  async (
    { url, method, body, params, headers },
    { getState, signal, dispatch }
  ) => {
    try {
      const token = localStorage.getItem("access-token");
      const getAuthHeader = () => ({
        Authorization: `Bearer ${token}`,
      });

      const result = await axios({
        url: url.startsWith("http") ? url : baseUrl + url,
        method: method ?? "GET",
        data: body,
        timeout: 600000,
        params,
        signal,
        headers: {
          ...getAuthHeader(),
          ...headers,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status ?? null,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.API_BASE_URL as string,
  }),
  endpoints: () => ({}),
});
