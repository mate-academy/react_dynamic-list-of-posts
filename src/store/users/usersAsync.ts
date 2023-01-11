import { createAsyncThunk } from '@reduxjs/toolkit';
import User from 'models/User';
import { client } from 'utilities/axiosClient';

const endpoint = '/users';

const UsersAsync = {
  // Fetch users
  fetchUsers: createAsyncThunk('users/fetchUsers', async () => {
    const users: User[] = await client.get(endpoint);

    return users;
  }),
};

export default UsersAsync;
