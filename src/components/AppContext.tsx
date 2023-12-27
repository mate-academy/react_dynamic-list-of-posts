import React, { useEffect, useState } from 'react';
import * as API_USERS from '../api/users';
import * as API_POSTS from '../api/posts';
import * as API_COMMENTS from '../api/comments';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type AppContexTypes = {
  getUsers: () => Promise<User[]>,
  getUserPosts: (userId: number) => Promise<Post[]>,
  getPostComments: (postId: number) => Promise<Comment[]>,
  newComment: (data: Omit<Comment, 'id'>) => Promise<Comment>,
  deleteComment: (commentId: number) => Promise<unknown>,
  users: User[],
  setUsers: (users: User[]) => void,
  selectedUser: User | null,
  setSelectedUser: (selectedUser: User | null) => void,
  userPosts: Post[] | null,
  setUserPosts: (userPosts: Post[] | null) => void,
  comments: Comment[] | null,
  // setComments: (comments: Comment[]
  // | ((comments: Comment[]) => Comment[]) | null) => void,
  setComments: (comments: Comment[] | null) => void,
  isUserPostsLoading: boolean,
  setIsUserPostsLoading: (isUserPostsLoading: boolean) => void,
  isError: boolean,
  setIsError: (error: boolean) => void,
  isPostDetails: boolean,
  setIsPostDetails: (isPostDetails: boolean
  | ((isPostDetails: boolean) => boolean)) => void,
  selectedPost: Post | null,
  setSelectedPost: (selectedPost: Post | null) => void,
};

export const AppContext = React.createContext({} as AppContexTypes);

type AppProviderProps = {
  children: React.ReactNode,
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const getUsers = async (): Promise<User[]> => API_USERS.getUsersList();

  const getUserPosts = async (userId: number): Promise<Post[]> => {
    return API_POSTS.getUserPostsList(userId);
  };

  const getPostComments = async (postId: number): Promise<Comment[]> => {
    return API_COMMENTS.getPostCommentsList(postId);
  };

  const newComment = async (data: Omit<Comment, 'id'>): Promise<Comment> => {
    return API_COMMENTS.postComment(data);
  };

  const deleteComment = async (commentId: number) => {
    return API_COMMENTS.deleteCommentItem(commentId);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  // eslint-disable-next-line no-spaced-func
  // const [comments, setComments] = useState<Comment[]
  // | ((comments: Comment[]) => Comment[]) | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPostDetails, setIsPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(usersList => {
        setUsers(usersList);
        setIsError(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const value = {
    getUsers,
    getUserPosts,
    getPostComments,
    newComment,
    deleteComment,
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userPosts,
    comments,
    setComments,
    setUserPosts,
    isUserPostsLoading,
    setIsUserPostsLoading,
    isError,
    setIsError,
    isPostDetails,
    setIsPostDetails,
    selectedPost,
    setSelectedPost,
  };

  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  );
};
