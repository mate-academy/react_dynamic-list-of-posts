import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

const USER_URL = '/users';

type ContextType = {
  users: User[];
  loadingComments: boolean;
  message: string;
  comments: Comment[];
  getComments: (postId: number) => void;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  openForm: boolean;
  setOpenForm: React.Dispatch<boolean>;
};

export const Context = React.createContext<ContextType>({
  users: [],
  loadingComments: false,
  message: '',
  comments: [],
  getComments: () => {},
  setComments: () => {},
  openForm: false,
  setOpenForm: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [message, setMessage] = useState('');
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    client
      .get<User[]>(USER_URL)
      .then(response => setUsers(response))
      .catch(() => {});
  }, []);

  const getComments = useCallback(async (postId: number) => {
    setLoadingComments(true);
    setMessage('');

    return client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(response => {
        setComments(response);

        if (!response.length) {
          setMessage('No comments yet');
        } else {
          setMessage('Comments:');
        }
      })
      .catch(() => setMessage('Something went wrong!'))
      .finally(() => setLoadingComments(false));
  }, []);

  const value = useMemo(
    () => ({
      users,
      loadingComments,
      message,
      comments,
      getComments,
      setComments,
      openForm,
      setOpenForm,
    }),
    [users, loadingComments, message, comments, getComments, openForm],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
