import React, { useState, useEffect } from 'react';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import { User } from './types/User';

type PostsContextType = {
  postsFromServer: Post[] | null;
  errorMessage: boolean;
  selectedUser: User | null;
  noPostsMessage: boolean;
  isLoading: boolean;
  currentPost: Post | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsContext = React.createContext<PostsContextType>({
  postsFromServer: null,
  errorMessage: false,
  selectedUser: null,
  noPostsMessage: false,
  isLoading: false,
  currentPost: null,
  setSelectedUser: () => { },
  setCurrentPost: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvide: React.FC<Props> = ({ children }) => {
  const [postsFromServer, setPostsFromServer] = useState<Post[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [noPostsMessage, setNoPostsMessage] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(false);
    }

    if (selectedUser) {
      setIsLoading(true);

      (async () => {
        try {
          const posts: Post[] = await client.get(`/posts?userId=${selectedUser?.id}`);

          if (!posts.length) {
            setNoPostsMessage(true);
            setPostsFromServer(posts);

            return;
          }

          setPostsFromServer(posts);
        } catch {
          setErrorMessage(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [selectedUser]);

  const value = {
    postsFromServer,
    errorMessage,
    selectedUser,
    noPostsMessage,
    isLoading,
    currentPost,
    setSelectedUser,
    setCurrentPost,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
