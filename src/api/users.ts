import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { ENDPOINTS } from '../helpers/endPointsHelper';

export const getUsers = () => {
  return client.get<User[]>(`${ENDPOINTS.users}`);
};

export const createUser = (user: Omit<User, 'id'>) => {
  return client.post<User>(`${ENDPOINTS.users}`, user);
};

export const editUser = (user: User) => {
  return client.patch<User>(`${ENDPOINTS.users}/${user.id}`, user);
};

export const deleteUser = (userId: number) => {
  return client.delete(`${ENDPOINTS.users}/${userId}`);
};
