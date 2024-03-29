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

  const fetchUserComments = (postId: number) => {
    if (postId) {
      getComments(postId)
        .then(setComments)
        .catch(() => {});
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
      }}
    >
      {children}
    </UserListContext.Provider>
  );
};
