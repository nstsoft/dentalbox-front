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
  dentalMapApi,
  appointmentApi,
  chairApi,
  metadataApi,
  serviceApi,
  historyApi,
  anamnesisApi,
  treatmentPlanApi,
  fileApi,
  chatApi,
} from "./api";

export * as API_CONSTANTS from "./constants";

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
    [dentalMapApi.reducerPath]: dentalMapApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [chairApi.reducerPath]: chairApi.reducer,
    [metadataApi.reducerPath]: metadataApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [anamnesisApi.reducerPath]: anamnesisApi.reducer,
    [treatmentPlanApi.reducerPath]: treatmentPlanApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
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
      dentalMapApi.middleware,
      appointmentApi.middleware,
      chairApi.middleware,
      metadataApi.middleware,
      serviceApi.middleware,
      historyApi.middleware,
      anamnesisApi.middleware,
      treatmentPlanApi.middleware,
      fileApi.middleware,
      chatApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
