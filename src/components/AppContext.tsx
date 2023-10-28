import React, { useMemo, useState } from 'react';
import { User } from '../types/User';
import { Context } from '../types/Context';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const AppContext = React.createContext<(Context)>({
  users: [],
  setUsers: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
  userPosts: [],
  setUserPosts: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
  comments: [],
  setComments: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const value = useMemo(() => ({
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userPosts,
    setUserPosts,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
  }), [users, selectedUser, userPosts, selectedPost, comments]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
