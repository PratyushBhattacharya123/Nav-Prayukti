import { apiSlice } from "../api/apiSlice";

export const sensorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSensorData: builder.query({
      query: () => ({
        url: "get-data",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllSensorDataQuery } = sensorApi;
