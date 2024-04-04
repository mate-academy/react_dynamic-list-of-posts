import React, { createContext, useState } from 'react';
import { User } from '../types/User';

type SetUserContextType = React.Dispatch<React.SetStateAction<User | null>>;

export const UserContext = createContext<User | null>(null);
export const SetUserContext = createContext<SetUserContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={selectedUser}>
      <SetUserContext.Provider value={setSelectedUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};
