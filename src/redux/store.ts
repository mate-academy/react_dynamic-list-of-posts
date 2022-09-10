import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
