import React, { useState } from 'react';
import { User } from '../types/User';

type CurrentUserType = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  visibleUsers: boolean;
  setVisibleUsers: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CurrentUserContext = React.createContext<CurrentUserType>({
  selectedUser: null,
  setSelectedUser: () => {},
  visibleUsers: false,
  setVisibleUsers: () => {},
});

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [visibleUsers, setVisibleUsers] = useState(false);

  return (
    <CurrentUserContext.Provider
      value={{ selectedUser, setSelectedUser, visibleUsers, setVisibleUsers }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
