import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
