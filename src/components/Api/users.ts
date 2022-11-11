import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

// sending request for get all users that saves on API server
export const getUsers = async () => {
  const users = await client.get<User[]>('/users');

  return users || null;
};
