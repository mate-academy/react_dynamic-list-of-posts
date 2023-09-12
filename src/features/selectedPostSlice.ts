/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      if (state.selectedPost?.id === action.payload?.id) {
        state.selectedPost = null;

        return;
      }

      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
