import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteComment,
  getPostComments,
  postNewComment,
  TCommentToPost,
} from '../../api/comments';

import { IComment } from '../../types/Comment.interface';
import { EStatus } from '../../types/Status.enum';

export const fetchPostComments = createAsyncThunk(
  'user/fetchPostComments',
  async (userId: number) => {
    const response = await getPostComments(userId);

    return response;
  },
);

export const fetchNewComment = createAsyncThunk(
  'user/fetchNewComment',
  async (comment: TCommentToPost) => {
    const response = await postNewComment(comment);

    return response;
  },
);

type TCommentState = {
  comments: IComment[],
  status: EStatus,
  newCommentStatus: EStatus,
};

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const commentSlice = createSlice({
  name: 'user',
  initialState: {
    comments: [],
    status: EStatus.IDLE,
    newCommentStatus: EStatus.IDLE,
  } as TCommentState,
  reducers: {
    removeComment: (state, action) => {
      if (!action.payload.id) {
        return;
      }

      state.comments = state.comments.filter(
        comment => comment.id !== action.payload?.id,
      );

      deleteComment(action.payload.id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = EStatus.SUCCESS;
      })
      .addCase(fetchPostComments.pending, state => {
        state.status = EStatus.PENDING;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.status = EStatus.ERROR;
      });

    builder
      .addCase(fetchNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.newCommentStatus = EStatus.SUCCESS;
      })
      .addCase(fetchNewComment.pending, state => {
        state.newCommentStatus = EStatus.PENDING;
      })
      .addCase(fetchNewComment.rejected, state => {
        state.newCommentStatus = EStatus.ERROR;
      });
  },
});
/* eslint-enable no-param-reassign */

export const { removeComment } = commentSlice.actions;
export default commentSlice.reducer;
