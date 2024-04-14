import React, { createContext, useEffect, useState } from 'react';
import { getUsers } from '../api/fetches';
import { User } from '../types/User';
import { Post } from '../types/Post';

type State = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isOpenListUser: boolean;
  setIsOpenListUser: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isWarming: boolean;
  setIsWarming: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingFail: boolean;
  setIsLoadingFail: React.Dispatch<React.SetStateAction<boolean>>;
  currentPost: Post | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
  visibleForm: boolean;
  setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
};
export const StateContext = createContext<State>({
  users: [],
  setUsers: () => {},
  isOpenListUser: false,
  setIsOpenListUser: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  posts: null,
  setPosts: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isWarming: false,
  setIsWarming: () => {},
  isLoadingFail: false,
  setIsLoadingFail: () => {},
  currentPost: null,
  setCurrentPost: () => {},
  visibleForm: false,
  setVisibleForm: () => {},
});
type Props = {
  children: React.ReactNode;
};
export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpenListUser, setIsOpenListUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWarming, setIsWarming] = useState<boolean>(false);
  const [isLoadingFail, setIsLoadingFail] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  const state = {
    users,
    setUsers,
    isOpenListUser,
    setIsOpenListUser,
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    isLoading,
    setIsLoading,
    isWarming,
    setIsWarming,
    isLoadingFail,
    setIsLoadingFail,
    currentPost,
    setCurrentPost,
    visibleForm,
    setVisibleForm,
  };

  useEffect(() => {
    getUsers().then(response => {
      setUsers(response);
    });
  }, []);

  return (
    <StateContext.Provider value={state}> {children} </StateContext.Provider>
  );
};
