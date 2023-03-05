import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/IUser';
import { fetchUsers } from '../app/thunks';

export interface UsersSlice {
  users: IUser[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersSlice = {
  users: [],
  loaded: false,
  hasError: false,
};

/* eslint-disable no-param-reassign */
// Reason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchUsers.fulfilled, (
        state, action: PayloadAction<IUser[]>,
      ) => {
        state.loaded = true;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});
/* eslint-enable no-param-reassign */

export default usersSlice.reducer;
