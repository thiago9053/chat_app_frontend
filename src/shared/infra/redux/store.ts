import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/modules/foo/slices";
import { api } from "@/shared/infra/redux/api";

export const store = configureStore({
  reducer: {
    counterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
