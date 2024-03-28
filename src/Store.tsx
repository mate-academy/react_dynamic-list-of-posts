import React, { ReactNode, createContext, useReducer } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

interface State {
  users: User[];
  selectedUser: User | null;
  posts: Post[] | null;
  currentPost: Post | null;
  comments: Comment[] | null;
  errorPosts: string | null;
  errorComments: string | null;
  loaderPost: boolean;
  writeCommentActive: boolean;
}

const initialState: State = {
  users: [],
  selectedUser: null,
  posts: null,
  currentPost: null,
  comments: null,
  errorPosts: null,
  errorComments: null,
  loaderPost: false,
  writeCommentActive: false,
};

type Action =
  | { type: 'setUsers'; payload: User[] }
  | { type: 'setSelectedUser'; payload: User }
  | { type: 'setPosts'; payload: Post[] | null }
  | { type: 'setCurrentPost'; payload: Post | null }
  | { type: 'setComments'; payload: Comment[] | null }
  | { type: 'addComment'; payload: Comment }
  | { type: 'setWriteCommentActive'; payload: boolean }
  | { type: 'loaderPost'; payload: boolean }
  | { type: 'setErrorPosts'; payload: string }
  | { type: 'setErrorComments'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        users: action.payload,
      };

    case 'setSelectedUser':
      return {
        ...state,
        selectedUser: action.payload,
      };

    case 'setPosts':
      return {
        ...state,
        posts: action.payload,
      };

    case 'setCurrentPost':
      return {
        ...state,
        currentPost: action.payload,
      };

    case 'setComments':
      return {
        ...state,
        comments: action.payload,
      };

    case 'addComment':
      return {
        ...state,
        comments: state.comments
          ? [...state.comments, action.payload]
          : [action.payload],
      };

    case 'loaderPost':
      return {
        ...state,
        loaderPost: action.payload,
      };

    case 'setWriteCommentActive':
      return {
        ...state,
        writeCommentActive: action.payload,
      };

    case 'setErrorPosts':
      return {
        ...state,
        errorPosts: action.payload,
      };

    case 'setErrorComments':
      return {
        ...state,
        errorComments: action.payload,
      };

    default:
      return state;
  }
}

export const Context = createContext(initialState);
export const DispatchContext = createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: ReactNode;
};

export const Store: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </DispatchContext.Provider>
  );
};
