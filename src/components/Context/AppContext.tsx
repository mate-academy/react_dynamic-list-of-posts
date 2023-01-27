import React, { useCallback, useState } from 'react';
import { IPost, User } from '../../types';

type Context = {
  selectedPost: IPost | null
  selectedUser: User | null
  isLoadingComments: boolean
  isFormOpen: boolean
  setLoading: (param: boolean) => void
  setFormOpen: (param: boolean) => void
  setUser: (user: User | null) => void
  setPost: (post: IPost | null) => void
};

export const AppContext = React.createContext<Context>({
  selectedPost: null,
  selectedUser: null,
  isLoadingComments: false,
  isFormOpen: false,
  setLoading: () => {},
  setFormOpen: () => {},
  setUser: () => {},
  setPost: () => {},
});

type Props = {
  children: React.ReactNode
};

export const AppProvider = ({ children }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const setUser = useCallback(
    (user: User | null) => setSelectedUser(user),
    [],
  );

  const setPost = useCallback(
    (newPost: IPost | null) => setSelectedPost(newPost),
    [],
  );

  const setLoading = useCallback(
    (param: boolean) => setIsLoadingComments(param),
    [],
  );

  const setFormOpen = useCallback(
    (param: boolean) => setIsFormOpen(param),
    [],
  );

  const providerValue: Context = {
    selectedUser,
    selectedPost,
    isFormOpen,
    isLoadingComments,
    setPost,
    setUser,
    setFormOpen,
    setLoading,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
