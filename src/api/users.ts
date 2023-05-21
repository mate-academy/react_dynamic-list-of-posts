/* eslint-disable no-useless-catch */
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsersList = async () => {
  try {
    const users = await client.get<User[]>('/users');

    return users || null;
  } catch (error) {
    throw error;
  }
};
