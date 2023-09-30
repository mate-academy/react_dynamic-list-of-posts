import React, { useMemo, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

interface IPostsContext {
  users: User[],
  setUsers: (listOfUsers: User[]) => void,
  posts: Post[],
  setPosts: (v: Post[]) => void,
  selectedUser: User | null,
  setSelectedUser: (newUser: User) => void,
  errorMessage: string,
  setErrorMessage: (newMessage: string) => void,
}

export const PostsContext = React.createContext<IPostsContext>({
  users: [],
  setUsers: () => {},
  posts: [],
  setPosts: () => { },
  selectedUser: null,
  setSelectedUser: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});

export const usePosts = (): IPostsContext => React.useContext(PostsContext);

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const value = useMemo(() => ({
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    users,
    setUsers,
    errorMessage,
    setErrorMessage,
  }), [selectedUser, posts, users, errorMessage]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
