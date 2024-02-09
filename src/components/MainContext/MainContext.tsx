import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { Errors } from '../../types/Errors';
import { ContextProps } from '../../types/ContextProps';

export const MainContext = React.createContext<ContextProps>({
  users: [],
  posts: [],
  setPosts: () => { },
  chosenPost: null,
  setChosenPost: () => { },
  comments: [],
  setComments: () => { },
  error: Errors.NONE,
  setError: () => { },
  isLoading: false,
  setIsLoading: () => { },
  isActiveComForm: false,
  setIsActiveComForm: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<Errors>(Errors.NONE);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveComForm, setIsActiveComForm] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <MainContext.Provider
      value={{
        users,
        posts,
        setPosts,
        chosenPost,
        setChosenPost,
        comments,
        setComments,
        error,
        setError,
        isLoading,
        setIsLoading,
        isActiveComForm,
        setIsActiveComForm,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
