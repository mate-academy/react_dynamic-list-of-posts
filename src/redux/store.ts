import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import commentReducer from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
