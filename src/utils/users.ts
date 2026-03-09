import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const createUsers = (data: Omit<User, 'id'>) => {
  return client.post<User[]>('/users', data);
};

export const deleteUsers = (usersId: number) => {
  return client.delete(`/users/${usersId}`);
};

export const updateUsers = ({ id, ...data }: User) => {
  return client.patch<User>(`/users/${id}`, data);
};
