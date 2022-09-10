import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserPosts } from '../../api/posts';

import { IPost } from '../../types/Post.interface';
import { EStatus } from '../../types/Status.enum';

export const fetchUserPosts = createAsyncThunk(
  'user/fetchPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

type TPostState = {
  posts: IPost[],
  currentPost: IPost | null,
  status: EStatus,
};

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const postSlice = createSlice({
  name: 'user',
  initialState: {
    posts: [],
    currentPost: null,
    status: EStatus.IDLE,
  } as TPostState,
  reducers: {
    setCurrentPost: (
      state,
      action: { type: string, payload: IPost | null },
    ) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = EStatus.SUCCESS;
      })
      .addCase(fetchUserPosts.pending, state => {
        state.status = EStatus.PENDING;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.status = EStatus.ERROR;
      });
  },
});
/* eslint-enable no-param-reassign */

export const { setCurrentPost } = postSlice.actions;
export default postSlice.reducer;
