/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Post from 'models/Post';
import PostsAsync from './postsAsync';

export interface State {
  posts: Post[] | null;
  selectedPost: Post | null;
}

const initialState: State = {
  posts: null,
  selectedPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state:State, action:PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setInitialField: <StateKey extends keyof State>
    (state: State, action: PayloadAction<StateKey>) => {
      state[action.payload] = initialState[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(
        PostsAsync.fetchPosts.fulfilled,
        (state: State, action: PayloadAction<Post[]>) => {
          state.posts = action.payload;
        },
      );
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
