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
  setError: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  post: Post[];
  setPost: Dispatch<SetStateAction<Post[]>>;
  setDetail: Dispatch<SetStateAction<boolean>>;
  detail: boolean;
  fetchUserComments: (postId: number) => void;
  comments: Comment[];
};

const initialListContextValue: ListContextType = {
  users: [],
  setUsers: () => {},
  setIsLoader: () => {},
  isLoader: false,
  setError: () => {},
  error: false,
  post: [],
  setPost: () => {},
  setDetail: () => {},
  detail: false,
  fetchUserComments: () => {},
  comments: [],
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
  const [error, setError] = useState(false);
  const [post, setPost] = useState<Post[]>([]);
  const [detail, setDetail] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

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
        error,
        setError,
        post,
        setPost,
        detail,
        setDetail,
        fetchUserComments,
        comments,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
};
