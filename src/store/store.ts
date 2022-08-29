import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice/postSlice";

export const store = configureStore({
  reducer: {
    postSlice
  },
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
