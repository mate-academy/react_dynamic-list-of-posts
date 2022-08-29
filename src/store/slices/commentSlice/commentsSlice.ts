import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
export interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: string,
  updatedAt: string
};

interface CommentState {
  comments: Comment[]
};

const initialState: CommentState = {
  comments: []
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<Comment[]>
    ) => {
      state.comments = action.payload
    },
  },
});

export default commentSlice.reducer;
