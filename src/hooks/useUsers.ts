import { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

interface UsersState {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
}

export function useUsers() {
  const [state, setState] = useState<UsersState>({
    users: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    const loadUsers = async () => {
      setState(prev => ({ ...prev, isLoading: true, hasError: false }));

      try {
        const data = await client.get<User[]>('/users');

        setState({
          users: data,
          isLoading: false,
          hasError: false,
        });
      } catch {
        setState({
          users: [],
          isLoading: false,
          hasError: true,
        });
      }
    };

    loadUsers();
  }, []);

  return {
    users: state.users,
    usersLoading: state.isLoading,
    usersError: state.hasError,
  };
}
