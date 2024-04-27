import React, { useState } from 'react';
import { User } from './types/User';
import { Setters } from './types/Setters';
import { State } from './types/State';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

type InitialContext = { state: State; setters: Setters };

const initialContext: InitialContext = {
  state: {
    selectedUser: null,
    selectedPost: null,
    comments: [],
  },

  setters: {
    setSelectedUser: () => {},
    setSelectedPost: () => {},
    setComments: () => {},
  },
};

type Props = {
  children: React.ReactNode;
};

export const postsContext = React.createContext(initialContext);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const state = {
    selectedUser,
    selectedPost,
    comments,
  };
  const setters = {
    setSelectedUser,
    setSelectedPost,
    setComments,
  };
  const value: InitialContext = { state, setters };

  return (
    <postsContext.Provider value={value}>{children}</postsContext.Provider>
  );
};
