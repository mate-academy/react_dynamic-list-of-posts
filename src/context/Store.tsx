import React, { useState } from 'react';
import { User } from '../types/User';
import { Setters } from '../types/Setters';
import { State } from '../types/State';
import { Post } from '../types/Post';

type InitialContext = { state: State; setters: Setters };

const initialContext: InitialContext = {
  state: {
    selectedUser: null,
    selectedPost: null,
  },

  setters: {
    setSelectedUser: () => {},
    setSelectedPost: () => {},
  },
};

type Props = {
  children: React.ReactNode;
};

export const postsContext = React.createContext(initialContext);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const state = {
    selectedUser,
    selectedPost,
  };
  const setters = {
    setSelectedUser,
    setSelectedPost,
  };
  const value: InitialContext = { state, setters };

  return (
    <postsContext.Provider value={value}>{children}</postsContext.Provider>
  );
};
