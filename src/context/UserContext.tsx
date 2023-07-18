import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export interface ProvidedValue {
  users: User[]
  selectedUser: User | null,
  onSelect: (user: User) => void,
}

type Props = {
  children: React.ReactNode
};

export const UserContext = createContext({} as ProvidedValue);

export const UserContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then((res) => setUsers(res));
  }, []);

  const onSelect = (user: User) => {
    setSelectedUser(user);
  };

  const providedValue = useMemo(() => ({
    users,
    selectedUser,
    onSelect,
  }), [users, selectedUser]);

  return (
    <UserContext.Provider value={providedValue}>
      {children}
    </UserContext.Provider>
  );
};
