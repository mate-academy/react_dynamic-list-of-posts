import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../types/IComment';
import { fetchNewComment, fetchPostComments } from '../app/thunks';

export interface CommentsSlice {
  items: IComment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

/* eslint-disable no-param-reassign */
// Reason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (
      state, action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(({ id }) => (
        id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchPostComments.fulfilled, (
        state, action: PayloadAction<IComment[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
    builder
      .addCase(fetchNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchNewComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});
/* eslint-enable no-param-reassign */

export const { removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
