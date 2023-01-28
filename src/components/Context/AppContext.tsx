import React, { useState } from 'react';
import { IPost, User } from '../../types';

type Context = {
  postState: [IPost | null, (post: IPost | null) => void]
  userState: [User | null, (user: User | null) => void]
  loadingState: [boolean, (param: boolean) => void]
  formState: [boolean, (param: boolean) => void]
};

export const AppContext = React.createContext<Context>({
  postState: [null, () => {}],
  userState: [null, () => {}],
  loadingState: [false, () => {}],
  formState: [false, () => {}],
});

type Props = {
  children: React.ReactNode
};

export const AppProvider = ({ children }: Props) => {
  const userState = useState<User | null>(null);
  const postState = useState<IPost | null>(null);
  const formState = useState(false);
  const loadingState = useState(false);

  const providerValue: Context = {
    userState,
    postState,
    formState,
    loadingState,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
