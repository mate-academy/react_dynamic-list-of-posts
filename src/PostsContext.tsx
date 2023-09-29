import React, {
  useContext,
  useState,
} from 'react';

import {
  getComments,
  getPosts,
} from './api/posts';

import { Comment } from './types/Comment';
import { Errors } from './types/Errors';
import { Post } from './types/Post';
import { PostsContextType } from './types/PostsContextType';
import { User } from './types/User';

type Props = {
  children: React.ReactNode;
};

export const PostsContext = React.createContext<PostsContextType>({
  selectedUser: null,
  setSelectedUser: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  removeError: () => {},
  posts: [],
  loadingPosts: false,
  loadingComments: false,
  setLoadingComments: () => {},
  getAllUserPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  getPostDetails: () => {},
  comments: [],
  setComments: () => {},
  openForm: false,
  setOpenForm: () => {},
});

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const removeError = (time = 3000) => {
    setTimeout(() => {
      setErrorMessage('');
    }, time);
  };

  const getAllUserPosts = (userId: number) => {
    setLoadingPosts(true);

    getPosts(userId)
      .then(setPosts)
      .catch(() => {
        setErrorMessage(Errors.loadingPosts);
        removeError();
      })
      .finally(() => setLoadingPosts(false));
  };

  const getPostDetails = (postId: number) => {
    setLoadingComments(true);

    getComments(postId)
      .then(setComments)
      .catch(() => {
        setErrorMessage(Errors.loadingComments);
        removeError();
      })
      .finally(() => setLoadingComments(false));
  };

  return (
    <PostsContext.Provider value={{
      selectedUser,
      setSelectedUser,
      errorMessage,
      setErrorMessage,
      removeError,
      posts,
      loadingPosts,
      loadingComments,
      setLoadingComments,
      getAllUserPosts,
      selectedPost,
      setSelectedPost,
      getPostDetails,
      comments,
      setComments,
      openForm,
      setOpenForm,
    }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
