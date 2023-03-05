import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/IUser';

export interface AuthorSlice {
  author: IUser | null;
}

const initialState: AuthorSlice = {
  author: null,
};

/* eslint-disable no-param-reassign */
// Reason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (
      state, action: PayloadAction<IUser>,
    ) => {
      state.author = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
