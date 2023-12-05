import React, { useEffect, useMemo, useState } from 'react';
import { User } from './types/User';
import { Context } from './types/Context';
import * as service from './api/api';
import { Post } from './types/Post';
// import { Comment } from './types/Comment';

export const AppContext = React.createContext<Context>({
  users: [],
  posts: [],
  setPosts: () => { },
  // comments: [],
  // setComments: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
});

interface Props {
  children: React.ReactNode,
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  // const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const value = useMemo(() => ({
    users,
    posts,
    setPosts,
    // comments,
    // setComments,
    selectedUser,
    setSelectedUser,
    selectedPost,
    setSelectedPost,
  }), [users, selectedUser, posts, selectedPost]);

  useEffect(() => {
    service.getUsers()
      .then((usersFromServer) => {
        setUsers(usersFromServer.slice(0, 11));
      });
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
