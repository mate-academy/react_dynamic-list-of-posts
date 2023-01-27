import {
  FC,
  useState,
  ReactNode,
  createContext,
} from 'react';
import { User } from '../types/User';

type ContextProps = {
  user: User | null;
  setUser: (usr: User | null) => void;
};

export const UsersContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: ReactNode;
};

export const UsersProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UsersContext.Provider value={{
      user,
      setUser: (usr: User | null) => setUser(usr),
    }}
    >
      {children}
    </UsersContext.Provider>
  );
};
