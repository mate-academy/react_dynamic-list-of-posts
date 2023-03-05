import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../types/IPost';

export interface SelectedPostSlice {
  post: IPost | null;
}

const initialState: SelectedPostSlice = {
  post: null,
};

/* eslint-disable no-param-reassign */
// Reason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    openPost: (state, action: PayloadAction<IPost>) => {
      state.post = action.payload;
    },
    closePost: (state) => {
      state.post = null;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { openPost, closePost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
