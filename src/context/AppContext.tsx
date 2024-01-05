import {
  FC, PropsWithChildren, createContext, useContext, useEffect, useState,
} from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

type AppContextType = {
  users: User[],
  selectUser: (user: User) => void,
  selectedUser: User | null,
};

const AppContextDefault = {
  users: [],
  selectUser: () => {},
  selectedUser: null,
};

export const AppContext = createContext<AppContextType>(AppContextDefault);

type Props = PropsWithChildren;

// CUSTOM PROVIDER
export const AppContextProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // LOAD DATA
  const loadData = () => {
    client.get('/users')
      .then(response => setUsers(response as User[]))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new Error('Unable to load users');
      });
  };

  // SELECT USER
  const selectUser = (user: User) => {
    if (selectedUser && selectedUser.id === user.id) {
      return;
    }

    setSelectedUser(user);
  };

  useEffect(() => {
    loadData();
  }, []);

  // APP CONTEXT VALUE
  const appContextValue = {
    users,
    selectUser,
    selectedUser,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

// CUSTOM HOOK
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside the AppContexProvicer');
  }

  return context;
};
