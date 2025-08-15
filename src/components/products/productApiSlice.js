import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const productApiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: productBaseUrl}),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetAllProductsQuery } = productApiSlice;
