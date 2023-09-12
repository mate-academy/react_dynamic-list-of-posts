/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  items: Post[],
  hasError: boolean,
  loaded: boolean,
};

const initialState: Props = {
  items: [],
  hasError: false,
  loaded: false,
};

export const loadApiPosts = createAsyncThunk(
  'posts/load',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadApiPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(loadApiPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      });

    builder.addCase(loadApiPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
