import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface UserContextI {
  users: User[];
  selectedUser: User | null;
  selectUser: (user: User | null) => void;
  isLoading: boolean;
  isError: boolean;
}

const UserContext = createContext<UserContextI>({
  users: [],
  selectedUser: null,
  selectUser: () => {},
  isLoading: false,
  isError: false,
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, selectUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then(data => setUsers(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const value = {
    users,
    selectedUser,
    selectUser,
    isLoading,
    isError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = () => useContext(UserContext);
