import { IUser } from '../types/User.interface';
import { client } from '../utils/fetchClient';

export const getUsers = () => (
  client.get<IUser[]>('/users')
);
