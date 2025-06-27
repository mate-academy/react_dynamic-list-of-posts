import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { ServiceErrors, ServiceErrorsValues } from '../types/Errors';
import { client } from '../utils/fetchClient';

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<ServiceErrorsValues | null>(null);

  async function getUserFromServer() {
    setError(null);

    try {
      const arrayOfUsers: User[] = await client.get('/users');

      setUsers(arrayOfUsers);
    } catch {
      setError(ServiceErrors.Unknown);
    } finally {
    }
  }

  useEffect(() => {
    getUserFromServer();
  }, []);

  return {
    users,
    error,
  };
};
