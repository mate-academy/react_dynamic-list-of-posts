import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUsers } from '../api/users';
import { Error } from '../types/Error';
import { Comment } from '../types/Comment';
import { getPosts } from '../api/posts';

type ContextProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  errorMessage: Error | null;
  setErrorMessage: (newError: Error | null) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isCommenting: boolean;
  setIsCommenting: (v: boolean) => void;
};

export const Context = React.createContext<ContextProps>({
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
  posts: [],
  setPosts: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  isLoading: false,
  setIsLoading: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  isCommenting: false,
  setIsCommenting: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);
    getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage(Error.wrong))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedUser?.id) {
      setIsLoading(true);
      setErrorMessage(null);

      getPosts(selectedUser.id)
        .then(res => setPosts(res))
        .catch(() => {
          setErrorMessage(Error.wrong);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUser]);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    isLoading,
    setIsLoading,
    setErrorMessage,
    errorMessage,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    isCommenting,
    setIsCommenting,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
