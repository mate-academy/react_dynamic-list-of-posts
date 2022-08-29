import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string
};

interface UserState {
  selectedUser: User | null
};

const initialState: UserState = {
  selectedUser: null
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (
      state,
      action: PayloadAction<User | null>
    ) => {
      state.selectedUser = action.payload
    },
  },
});

export default userSlice.reducer
