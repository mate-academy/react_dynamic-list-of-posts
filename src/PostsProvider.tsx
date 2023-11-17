import React, { useState, useEffect } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getPosts } from './utils/posts';

type Props = {
  children: React.ReactNode
};

interface Context {
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  selectedUser: User | null
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  currentPosts: Post[] | null
  handleOpenPost: (post: Post) => void
  selectedPost: Post | null
  currentComments: Comment[]
  setCurrentComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

export const PostContext = React.createContext<Context>({
  error: null,
  setError: () => {},
  setIsLoading: () => {},
  isLoading: false,
  selectedUser: null,
  setSelectedUser: () => {},
  currentPosts: [],
  handleOpenPost: () => {},
  selectedPost: null,
  currentComments: [],
  setCurrentComments: () => {},
});

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPosts, setCurrentPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentComments, setCurrentComments]
  = useState<Comment[]>([]);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser.id)
        .then((postFromServer) => {
          setCurrentPosts(postFromServer);
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUser]);

  const handleOpenPost = (post: Post) => {
    setSelectedPost(post);

    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <PostContext.Provider
      value={{
        error,
        setError,
        isLoading,
        setIsLoading,
        selectedUser,
        setSelectedUser,
        currentPosts,
        handleOpenPost,
        selectedPost,
        currentComments,
        setCurrentComments,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
