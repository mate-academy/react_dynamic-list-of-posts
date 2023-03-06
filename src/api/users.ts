import { client } from '../utils/axiosClient';
import { IUser } from '../types/IUser';

export const getUsers = () => {
  return client.get<IUser[]>('/users');
};
