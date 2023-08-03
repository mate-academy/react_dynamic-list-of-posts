import { useContext } from 'react';
import { UserContext } from '../context/user.context';

export const useUser = () => {
  const { users, selectedUser, onUserSelect } = useContext(UserContext);

  return { users, selectedUser, onUserSelect };
};
