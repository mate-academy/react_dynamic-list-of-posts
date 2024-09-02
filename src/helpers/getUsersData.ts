import { client } from '../utils/fetchClient';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../types/User';

export const getUsersData = (setUsers: Dispatch<SetStateAction<User[]>>) => {
  return client.get<User[]>('/users').then(setUsers);
};
