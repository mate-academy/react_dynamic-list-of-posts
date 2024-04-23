import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../utils/apiHandler';
import { Post } from '../types/Post';

type Props = {
  children: React.ReactNode;
};

export enum ErrorType {
  noError = 'noError',
  loadingPosts = 'loadingPosts',
  loadingComments = 'loadingComments',
}

type PostsAppContextType = {
  usersList: User[];
  selectedUser: User | null;
  setSelectedUser: (v: null | User) => void;
  isLoadingPosts: boolean;
  setIsLoadingPosts: (v: boolean) => void;
  isLoadingComments: boolean;
  setIsLoadingComments: (v: boolean) => void;
  userPosts: Post[];
  setUserPosts: (v: Post[]) => void;
  errorType: ErrorType;
  setErrorType: (v: ErrorType) => void;
  selectedPost: null | Post;
  setSelectedPost: (v: null | Post) => void;
  isCommentFormEnabled: boolean;
  setIsCommentFormEnabled: (v: boolean) => void;
};

export const PostsAppContext = React.createContext<PostsAppContextType>({
  usersList: [],
  selectedUser: null,
  setSelectedUser: () => {},
  isLoadingPosts: false,
  setIsLoadingPosts: () => {},
  isLoadingComments: false,
  setIsLoadingComments: () => {},
  userPosts: [],
  setUserPosts: () => {},
  errorType: ErrorType.noError,
  setErrorType: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  isCommentFormEnabled: false,
  setIsCommentFormEnabled: () => {},
});

export const PostsAppProvider: React.FC<Props> = ({ children }) => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [errorType, setErrorType] = useState(ErrorType.noError);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  const [isCommentFormEnabled, setIsCommentFormEnabled] = useState(false);

  const getUsersList = () => {
    getUsers().then(users => setUsersList(users));
  };

  useEffect(() => getUsersList(), []);

  const contextValue = {
    usersList,
    selectedUser,
    setSelectedUser,
    isLoadingPosts,
    setIsLoadingPosts,
    isLoadingComments,
    setIsLoadingComments,
    userPosts,
    setUserPosts,
    errorType,
    setErrorType,
    selectedPost,
    setSelectedPost,
    isCommentFormEnabled,
    setIsCommentFormEnabled,
  };

  return (
    <PostsAppContext.Provider value={contextValue}>
      {children}
    </PostsAppContext.Provider>
  );
};
