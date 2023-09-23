import React, { useState, useContext } from 'react';
import { User } from '../../types/User';

interface SelectedUserContextType {
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = React.createContext({} as SelectedUserContextType);

type Props = {
  children: React.ReactNode,
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value = {
    selectedUser,
    setSelectedUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useSelectedUser = () => useContext(UserContext);
