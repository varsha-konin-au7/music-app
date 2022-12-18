import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,ARTIST_NAME,LASTFM_API_KEY} from "../../constants/constants";

export const lastFmApi = createApi({
  reducerPath: "lastFmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => `?method=artist.getTopAlbums&artist=${ARTIST_NAME}&api_key=${LASTFM_API_KEY}&format=json`,
    }),
  }),
});

export const { useGetAlbumsQuery} = lastFmApi;
