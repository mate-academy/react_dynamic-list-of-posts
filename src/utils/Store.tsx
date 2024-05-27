import { createContext, useReducer } from 'react';
import React from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export type Action =
  | { type: 'setUsers'; payload: User[] }
  | { type: 'setSelectedUser'; payload: User }
  | { type: 'setUserPosts'; payload: Post[] }
  | { type: 'setIsPostSelected'; payload: boolean }
  | { type: 'setSelectedPost'; payload: Post | null }
  | { type: 'setComments'; payload: Comment[] }
  | { type: 'updatedSetSelectedPost'; payload: Post }
  | { type: 'setIsForm'; payload: boolean };

export type State = {
  users: User[];
  selectedUser: User | null;
  userPosts: Post[];
  isSelectedPost: boolean;
  selectedPost: Post | null;
  comments: Comment[];
  isForm: boolean;
};

const initialState: State = {
  users: [],
  selectedUser: null,
  userPosts: [],
  isSelectedPost: false,
  selectedPost: null,
  comments: [],
  isForm: false,
};

type InitialDispatch = (action: Action) => void;

const reducer = (state: State, action: Action): State => {
  let newState: State = state;

  switch (action.type) {
    case 'setUsers':
      newState = {
        ...state,
        users: action.payload,
      };
      break;
    case 'setSelectedUser':
      newState = {
        ...state,
        selectedUser: action.payload,
      };
      break;
    case 'setUserPosts':
      newState = {
        ...state,
        userPosts: action.payload,
      };
      break;
    case 'setIsPostSelected':
      newState = {
        ...state,
        isSelectedPost: action.payload,
      };
      break;
    case 'setSelectedPost':
      newState = {
        ...state,
        selectedPost: action.payload,
      };
      break;
    case 'setComments':
      newState = {
        ...state,
        comments: action.payload,
      };
      break;
    case 'updatedSetSelectedPost':
      newState = {
        ...state,
        selectedPost: action.payload,
      };
      break;
    case 'setIsForm':
      newState = {
        ...state,
        isForm: action.payload,
      };
      break;
    default:
      newState = state;
  }

  return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
