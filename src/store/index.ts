import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  authApi,
  userApi,
  paymentApi,
  productApi,
  subscriptionApi,
  workspaceApi,
  cabinetApi,
  patientApi,
} from "./api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [cabinetApi.reducerPath]: cabinetApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      workspaceApi.middleware,
      subscriptionApi.middleware,
      paymentApi.middleware,
      cabinetApi.middleware,
      patientApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
