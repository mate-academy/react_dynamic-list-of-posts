import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import {
  deleteComment,
  getCommentsForPost,
  getUserPosts,
  getUsers,
  postComments,
} from './utils/apiLoader';
import { User } from './types/User';
import { Post } from './types/Post';
import { CommentPost, Comment } from './types/Comment';

export type AppContextProps = {
  children: React.ReactNode
};

export interface ContextProps {
  allUsers: User[];
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  selectedUserPosts: Post[];
  postActiveId: number;
  setPostActiveId: Dispatch<SetStateAction<number>>
  commentsForPost: Comment[];
  handleAddComment: (comment: CommentPost) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>
  error: string | null;
  setIsCommentSuccess: Dispatch<SetStateAction<boolean>>;
  isCommentSuccess: boolean;
  handleDeleteComment: (commentId: number) => void;
}

const initialState: ContextProps = {
  allUsers: [],
  selectedUser: null,
  selectedUserPosts: [],
  postActiveId: 0,
  setSelectedUser: () => {},
  setPostActiveId: () => {},
  commentsForPost: [],
  handleAddComment: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  isCommentSuccess: false,
  setIsCommentSuccess: () => {},
  handleDeleteComment: () => {},
};

export const GlobalContext = React.createContext<ContextProps>(initialState);

export const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);
  const [postActiveId, setPostActiveId] = useState<number>(0);
  const [commentsForPost, setCommentsForPost] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCommentSuccess, setIsCommentSuccess] = useState<boolean>(true);

  useEffect(() => {
    setCommentsForPost([]);
    setSelectedUserPosts([]);
    setPostActiveId(0);
  }, [selectedUser]);

  useEffect(() => {
    getUsers()
      .then(setAllUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getUserPosts(selectedUser.id)
        .then((setSelectedUserPosts))
        .catch(() => setError('Something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (postActiveId !== 0) {
      getCommentsForPost(postActiveId)
        .then(setCommentsForPost)
        .catch(() => setError('Something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [postActiveId]);

  const handleAddComment = (comment: CommentPost) => {
    postComments(comment)
      .then(data => (
        setCommentsForPost(prev => ([...prev, data]))
      ))
      .finally(() => setIsCommentSuccess(true));
  };

  const handleDeleteComment = (commentId: number) => {
    setCommentsForPost((prev) => (
      prev.filter((comment) => comment.id !== commentId)
    ));
    deleteComment(commentId);
  };

  const contextValue: ContextProps = {
    allUsers,
    selectedUser,
    setSelectedUser,
    selectedUserPosts,
    postActiveId,
    setPostActiveId,
    commentsForPost,
    handleAddComment,
    isLoading,
    setIsLoading,
    error,
    setIsCommentSuccess,
    isCommentSuccess,
    handleDeleteComment,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
