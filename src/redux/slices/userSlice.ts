/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsers } from '../../api/users';

import { EStatus } from '../../types/Status.enum';
import { IUser } from '../../types/User.interface';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await getUsers();

    return response;
  },
);

type TUSerState = {
  list: IUser[],
  currentUser: IUser | null,
  status: EStatus,
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    currentUser: null,
    status: EStatus.IDLE,
  } as TUSerState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = EStatus.SUCCESS;
      })
      .addCase(fetchUsers.pending, state => {
        state.status = EStatus.PENDING;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = EStatus.ERROR;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
