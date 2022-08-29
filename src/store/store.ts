import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice/postSlice";
import userSlice from "./slices/userSlice/userSlice";
import commentsSlice from "./slices/commentSlice/commentsSlice";

export const store = configureStore({
  reducer: {
    postSlice,
    userSlice,
    commentsSlice
  },
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
