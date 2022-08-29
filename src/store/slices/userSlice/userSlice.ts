import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, Slice } from '@reduxjs/toolkit';
interface User {
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
  users: User[]
};

const initialState: UserState = {
  users: []
};

export const userSlice: Slice<UserState> = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<User[]>
    ) => {
      state.users = action.payload
    },
  },
});

export default userSlice.reducer
