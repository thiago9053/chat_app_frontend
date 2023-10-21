import { api } from "../api";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginArg = {
  username: string;
  password: string;
};

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginArg>({
      query: (queryArg) => ({
        url: "/user/login",
        method: "POST",
        body: { ...queryArg },
      }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as userApi };

export const { useLoginMutation } = injectedRtkApi;
