import React, { useMemo } from 'react';
import { User } from '../types/User';

type SelectedUserContextType = {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const SelectedUserContext = React.createContext<SelectedUserContextType>(
  {
    selectedUser: null,
    setSelectedUser: () => {},
  },
);

type Props = {
  children: React.ReactNode;
};

export const SelectedUserProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const value = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
    }),
    [selectedUser, setSelectedUser],
  );

  return (
    <SelectedUserContext.Provider value={value}>
      {children}
    </SelectedUserContext.Provider>
  );
};
