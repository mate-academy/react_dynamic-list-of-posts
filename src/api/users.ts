import { ApiPath } from '../enums/ApiPath';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`${ApiPath.USERS_PATH}`);
};

export const getById = (id: number) => {
  return client.get<User>(`${ApiPath.USERS_PATH}/${id}`);
};
