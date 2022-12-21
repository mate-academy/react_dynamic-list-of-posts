import {
  FC,
  useState,
  useEffect,
  useCallback,
  createContext,
} from 'react';

import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type Props = {
  children: React.ReactNode;
};

type Context = {
  users: User[] | null;
  selectedUserName: string;
  selectedUserId: number;
};

type UpdateContext = {
  handleUserNameSelection: (name: string, id: number) => void;
};

export const UsersContext = createContext<Context>({
  users: null,
  selectedUserName: 'Choose a user',
  selectedUserId: 0,
});

export const UsersUpdateContext = createContext<UpdateContext>({
  handleUserNameSelection: () => {},
});

export const UsersProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUserName, setSelectedUserName] = useState('Choose a user');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const getUsersFromServer = useCallback(async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      throw new Error('Unable to load users from the server!');
    }
  }, []);

  const handleUserNameSelection = useCallback(
    (name: string, id: number) => {
      setSelectedUserName(() => name);
      setSelectedUserId(() => id);
    }, [],
  );

  useEffect(() => {
    getUsersFromServer();
  }, []);

  const contextValue = {
    users,
    selectedUserName,
    selectedUserId,
  };

  const contextUpdateValue = {
    handleUserNameSelection,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      <UsersUpdateContext.Provider value={contextUpdateValue}>
        {children}
      </UsersUpdateContext.Provider>
    </UsersContext.Provider>
  );
};
