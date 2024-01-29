import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { Errors } from '../../types/Errors';

// at the end, move this props to a new folder
type ContextProps = {
  users: User[],
  posts: Post[] | undefined,
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>,
  choosedPost: Post | undefined,
  setChoosedPost: React.Dispatch<React.SetStateAction<Post | undefined>>,
  comments: Comment[] | undefined,
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>,
  error: Errors,
  setError: React.Dispatch<React.SetStateAction<Errors>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  isActiveComForm: boolean,
  setIsActiveComForm: React.Dispatch<React.SetStateAction<boolean>>,
};

export const UserContext = React.createContext<ContextProps>({
  users: [],
  posts: undefined,
  setPosts: () => { },
  choosedPost: undefined,
  setChoosedPost: () => { },
  comments: [],
  setComments: () => { },
  error: Errors.DEFAULT,
  setError: () => { },
  isLoading: false,
  setIsLoading: () => { },
  isActiveComForm: false,
  setIsActiveComForm: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>();
  const [choosedPost, setChoosedPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[] | undefined>();
  const [error, setError] = useState<Errors>(Errors.DEFAULT);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveComForm, setIsActiveComForm] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        posts,
        setPosts,
        choosedPost,
        setChoosedPost,
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
    </UserContext.Provider>
  );
};
