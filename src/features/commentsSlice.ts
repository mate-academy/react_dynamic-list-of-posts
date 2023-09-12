/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment as deleteFromServer,
  getPostComments,
} from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  items: Comment[],
  hasError: boolean,
  loaded: boolean,
};

const initialState: Props = {
  items: [],
  hasError: false,
  loaded: false,
};

export const loadApiComments = createAsyncThunk(
  'comments/load',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await deleteFromServer(id);

    return id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    forceDeleteComment: (state, action) => {
      state.items = state.items
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    let oldItems: Comment[] = [];

    builder.addCase(loadApiComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(loadApiComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      });

    builder.addCase(loadApiComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
        state.loaded = true;
      });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(deleteComment.pending, (state, action) => {
      oldItems = [...state.items];

      state.items
        .filter(comment => comment.id !== action.payload);
    });

    builder.addCase(deleteComment.rejected,
      (state) => {
        if (oldItems.length) {
          state.items = [...oldItems];
        }

        state.hasError = true;
      });
  },
});

export const { forceDeleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
