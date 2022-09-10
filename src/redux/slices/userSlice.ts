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
  users: IUser[],
  currentUser: IUser | null,
  status: EStatus,
};

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    status: EStatus.IDLE,
  } as TUSerState,
  reducers: {
    setCurrentUser: (
      state,
      action: { type: string, payload: IUser | null },
    ) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
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
/* eslint-enable no-param-reassign */

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
