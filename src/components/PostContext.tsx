import React, { useContext, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { PostsContext } from '../types/PostsContext';
import { getPosts } from '../api/posts';
import { UserContext } from './UserContext';
import { getComments } from '../api/comments';

const initialState = {
  posts: [],
  setPosts: () => {},
  hasPostsError: false,
  setHasPostsError: () => {},
  isLoadingPosts: false,
  setIsLoadingPosts: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  isLoadingComments: false,
  setIsLoadingComments: () => {},
  hasCommentsError: false,
  setHasCommentsError: () => {},
};

export const PostContext = React.createContext<PostsContext>(initialState);

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);

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

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);

      getComments(selectedPost.id)
        .then(commentsData => setComments(commentsData))
        .catch(() => setHasCommentsError(true))
        .finally(() => setIsLoadingComments(false));
    }
  },
  [selectedPost]);

  const value = {
    posts,
    setPosts,
    hasPostsError,
    setHasPostsError,
    isLoadingPosts,
    setIsLoadingPosts,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    isLoadingComments,
    setIsLoadingComments,
    hasCommentsError,
    setHasCommentsError,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>

  );
};
