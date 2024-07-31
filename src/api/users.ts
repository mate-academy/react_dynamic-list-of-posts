import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const deleteUser = (id: number) => {
  return client.delete(`/users/${id}`);
};

export const postUser = ({ id, name, email, phone }: User) => {
  return client.post<User>('/users', {
    id,
    name,
    email,
    phone,
  });
};

export const updateUser = ({ id, name, phone }: Omit<User, 'email'>) => {
  return client.patch<User>(`/users/${id}`, {
    name,
    phone,
  });
};
