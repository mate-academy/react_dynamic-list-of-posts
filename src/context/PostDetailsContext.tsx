import { Dispatch, SetStateAction, createContext } from 'react';
import {
  Loading,
  Error,
  Comment,
  Post,
} from '../types';

interface ContextType {
  post: Post | null;
  error: Error;
  loading: Loading;
  comments: Comment[];
  setLoading: (loading: Loading) => void;
  setComments: Dispatch<SetStateAction<Comment[]>>
  setError: (error: Error) => void;
}

const defaultValue = {
  post: {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  },
  error: Error.None,
  loading: Loading.None,
  comments: [],
  setLoading: () => {},
  setComments: () => {},
  setError: () => {},
};

export const PostDetailsContext = createContext<ContextType>(defaultValue);
