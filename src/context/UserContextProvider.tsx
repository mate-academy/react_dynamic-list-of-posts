import React, { useState } from 'react';
import { User } from '../types/User';

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: (us: User | null) => setUser(us),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
