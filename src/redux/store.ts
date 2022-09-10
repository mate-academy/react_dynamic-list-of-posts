import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
