import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import authorReducer from '../features/authorSlice';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
