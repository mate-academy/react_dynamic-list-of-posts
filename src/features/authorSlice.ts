/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null | undefined;
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null | undefined>) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
