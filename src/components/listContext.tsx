import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getComments } from './todosApi/api-todos';
import { Comment } from '../types/Comment';

type ListContextType = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  setIsLoader: Dispatch<SetStateAction<boolean>>;
  isLoader: boolean;
  setErrorPosts: Dispatch<SetStateAction<boolean>>;
  errorPosts: boolean;
  post: Post[];
  setPost: Dispatch<SetStateAction<Post[]>>;
  setDetail: Dispatch<SetStateAction<boolean>>;
  detail: boolean;
  fetchUserComments: (postId: number) => void;
  comments: Comment[];
  errorComments: boolean;
  setErrorComments: Dispatch<SetStateAction<boolean>>;
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  selectedPostId: number | null;
  setSelectedPostId: Dispatch<SetStateAction<number | null>>;
  loaderDetails: boolean;
  setIsLoaderDetails: Dispatch<SetStateAction<boolean>>;
};

const initialListContextValue: ListContextType = {
  users: [],
  setUsers: () => {},
  setIsLoader: () => {},
  isLoader: false,
  setErrorPosts: () => {},
  errorPosts: false,
  post: [],
  setPost: () => {},
  setDetail: () => {},
  detail: false,
  fetchUserComments: () => {},
  comments: [],
  errorComments: false,
  setErrorComments: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  selectedPostId: null,
  setSelectedPostId: () => {},
  loaderDetails: false,
  setIsLoaderDetails: () => {},
};

export const UserListContext = React.createContext<ListContextType>(
  initialListContextValue,
);

type PropsContext = {
  children: React.ReactNode;
};

export const ListContext: React.FC<PropsContext> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errorPosts, setErrorPosts] = useState(false);
  const [errorComments, setErrorComments] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const [detail, setDetail] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [loaderDetails, setIsLoaderDetails] = useState(false);

  const fetchUserComments = (postId: number) => {
    if (postId) {
      setIsLoaderDetails(true);
      getComments(postId)
        .then(setComments)
        .catch(() => {})
        .finally(() => {
          setIsLoaderDetails(false);
        });
    }
  };

  return (
    <UserListContext.Provider
      value={{
        users,
        setUsers,
        isLoader,
        setIsLoader,
        errorPosts,
        setErrorPosts,
        post,
        setPost,
        detail,
        setDetail,
        fetchUserComments,
        comments,
        errorComments,
        setErrorComments,
        selectedUser,
        setSelectedUser,
        selectedPostId,
        setSelectedPostId,
        loaderDetails,
        setIsLoaderDetails,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
};
