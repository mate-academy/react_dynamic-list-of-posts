import { User } from '../types/User';

export const getUserById = (users: User[], userId: number): User | null => {
  const foundedUser = users.find(user => user.id === userId) || null;

  return foundedUser;
};
