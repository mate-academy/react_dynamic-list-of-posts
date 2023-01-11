/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'models/User';
import UsersAsync from './usersAsync';

export interface State {
  users: User[] | null;
}

const initialState: State = {
  users: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(
        UsersAsync.fetchUsers.fulfilled,
        (state: State, action: PayloadAction<User[]>) => {
          state.users = action.payload;
        },
      );
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
