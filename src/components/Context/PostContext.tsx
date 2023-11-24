import React, { useContext, useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { PostsContext } from '../../types/PostsContext';
import { getPosts } from '../../api/posts';
import { UserContext } from './UserContext';

const initialState = {
  posts: [],
  setPosts: () => {},
  hasPostsError: false,
  setHasPostsError: () => {},
  isLoadingPosts: false,
  setIsLoadingPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
};

export const PostContext = React.createContext<PostsContext>(initialState);

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { selectedUser } = useContext(UserContext);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);

      getPosts(selectedUser.id)
        .then(postsData => setPosts(postsData))
        .catch(() => setHasPostsError(true))
        .finally(() => setIsLoadingPosts(false));
    }
  },
  [selectedUser]);

  const value = {
    posts,
    setPosts,
    hasPostsError,
    setHasPostsError,
    isLoadingPosts,
    setIsLoadingPosts,
    selectedPost,
    setSelectedPost,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>

  );
};
