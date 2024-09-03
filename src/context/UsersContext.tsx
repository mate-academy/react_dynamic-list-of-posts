import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../types/User';
import { getUsersData } from '../helpers/getUsersData';

interface Props {
  users: User[];
  setActiveUserId: Dispatch<SetStateAction<number | null>>;
  activeUserId: number | null;
}

const UserContext = createContext<Props | undefined>(undefined);

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);

  useEffect(() => {
    getUsersData(setUsers);
  }, []);

  const contextValue = {
    users,
    setActiveUserId,
    activeUserId,
    setUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUsersContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodoProvider');
  }

  return context;
};

export { UserContextProvider, useUsersContext };
