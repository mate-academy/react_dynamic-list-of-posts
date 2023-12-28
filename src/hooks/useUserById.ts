import { useContext } from 'react';
import { UsersContext } from '../store/UsersContext';
import { UserID } from '../types/User';

export const useUserById = (userId: UserID) => {
  const { users } = useContext(UsersContext);

  return users.find(user => user.id === userId);
};
