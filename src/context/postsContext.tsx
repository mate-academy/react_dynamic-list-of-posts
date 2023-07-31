import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getUsers } from '../api/users.api';
import { User } from '../types/User';

interface PostsProps {
  posts: Post[];
  users: User[];
  errorMessage: string,
  setPosts: (posts: Post[] | ((posts: Post[]) => Post[])) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null | ((post: Post | null) => Post)) => void;
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  setErrorMessage: (error: string | ((error: string) => string)) => void,
}

export const PostsContext = React.createContext<PostsProps>({
  posts: [],
  users: [],
  errorMessage: '',
  setPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  setErrorMessage: () => {},
});

export const PostsProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Cannot load data.');
      });
  }, []);

  const value = {
    posts,
    setPosts,
    errorMessage,
    selectedPost,
    setSelectedPost,
    users,
    selectedUser,
    setSelectedUser,
    setErrorMessage,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
