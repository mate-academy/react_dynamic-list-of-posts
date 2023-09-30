import React, { PropsWithChildren, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

interface PostsProps {
  posts: Post[];
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const value = {
    posts,
    setPosts,
    errorMessage,
    selectedPost,
    setSelectedPost,
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
