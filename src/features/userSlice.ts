/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  status: 'idle',
};

export const getUsersAsync = createAsyncThunk(
  'user/getUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
