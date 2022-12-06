/* eslint-disable @typescript-eslint/return-await */
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUsers = async () => {
  return await client.get<User[]>('/users');
};
