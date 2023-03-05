import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../types/IPost';
import { fetchUserPosts } from '../app/thunks';

export interface PostsSlice {
  items: IPost[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

/* eslint-disable no-param-reassign */
// Reason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchUserPosts.fulfilled, (
        state, action: PayloadAction<IPost[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});
/* eslint-enable no-param-reassign */

export const { removePosts } = postSlice.actions;
export default postSlice.reducer;
