import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

export const getUsers = async () => {
  const users = await client.get<User[]>('/users');

  return users || null;
};
