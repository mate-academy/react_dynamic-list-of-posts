/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Comment from 'models/Comment';
import CommentsAsync from './commentsAsync';

export interface State {
  comments: Comment[] | null;
}

const initialState: State = {
  comments: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setInitialField: <StateKey extends keyof State>
    (state: State, action: PayloadAction<StateKey>) => {
      state[action.payload] = initialState[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(
        CommentsAsync.fetchComments.fulfilled,
        (state: State, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
        },
      )
      // Create comment
      .addCase(
        CommentsAsync.createComment.fulfilled,
        (state: State, action:PayloadAction<Comment>) => {
          state.comments = state.comments
            ? [action.payload, ...state.comments]
            : [action.payload];
        },
      )
      // Delete comment
      .addCase(
        CommentsAsync.deleteComment.fulfilled,
        (state: State, action) => {
          const commentId = action.meta.arg;

          state.comments = state.comments
            ? state.comments.filter((comment) => comment.id !== commentId)
            : state.comments;
        },
      );
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
