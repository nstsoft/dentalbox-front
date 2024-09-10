import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi, userApi, productApi, subscriptionApi } from "./api";

import { workspaceApi } from "./api/workspace";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      workspaceApi.middleware,
      subscriptionApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
