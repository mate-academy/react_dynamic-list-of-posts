import { client } from '../utils/fetchClient';
import { IUser } from '../models/IUser';
import { ApiEndpoint } from '../utils/constants';

export const getUsers = () => {
  return client.get<IUser[]>(ApiEndpoint.Users);
};
