import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/authorSlice';
import commentsReducer from '../features/commentsSlice';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    comments: commentsReducer,
    users: usersReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
