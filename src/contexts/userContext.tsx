import React, { useMemo, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type UserContextType = {
  users: User[];
  setUsers: (users: User[]) => void;
  isListOpen: boolean;
  setIsListOpen: (isListOpen: boolean) => void;
  activeUser: number;
  setActiveUser: (activeUser: number) => void;
  postsOfUser: Post[];
  setPostsOfUser: (postsOfUser: Post[]) => void;
  loadingPostsError: boolean;
  setLoadingPostsError: (loadingPostsError: boolean) => void;
  isPostsLoaderOn: boolean;
  setIsPostsLoaderOn: (isPostsLoaderOn: boolean) => void;
  chosenUser: string;
  setChosenUser: (chosenUser: string) => void;
};

export const UserContext = React.createContext<UserContextType>({
  users: [],
  setUsers: () => {},
  isListOpen: false,
  setIsListOpen: () => {},
  activeUser: 0,
  setActiveUser: () => {},
  postsOfUser: [],
  setPostsOfUser: () => {},
  loadingPostsError: false,
  setLoadingPostsError: () => {},
  isPostsLoaderOn: false,
  setIsPostsLoaderOn: () => {},
  chosenUser: 'Choose a user',
  setChosenUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(0);
  const [postsOfUser, setPostsOfUser] = useState<Post[]>([]);
  const [loadingPostsError, setLoadingPostsError] = useState(false);
  const [isPostsLoaderOn, setIsPostsLoaderOn] = useState(false);
  const [chosenUser, setChosenUser] = useState('Choose a user');

  const value = useMemo(
    () => ({
      users,
      setUsers,
      isListOpen,
      setIsListOpen,
      activeUser,
      setActiveUser,
      postsOfUser,
      setPostsOfUser,
      loadingPostsError,
      setLoadingPostsError,
      isPostsLoaderOn,
      setIsPostsLoaderOn,
      chosenUser,
      setChosenUser,
    }),
    [
      users,
      isListOpen,
      activeUser,
      postsOfUser,
      loadingPostsError,
      isPostsLoaderOn,
      chosenUser,
    ],
  );

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
