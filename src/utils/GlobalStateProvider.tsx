import React, { useReducer } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Action =
  | { type: 'setUsers'; payload: User[] }
  | { type: 'setComments'; payload: Comment[] }
  | { type: 'setSelectedPost'; payload: Post | null }
  | { type: 'setIsPostSelected'; payload: boolean }
  | { type: 'setIsFormEnabled'; payload: boolean }
  | { type: 'setSelectedUser'; payload: User | null };

interface State {
  users: User[] | null;
  comments: Comment[];
  selectedUser: User | null;
  selectedPost: Post | null;
  isPostSelected: boolean;
  isFormEnabled: boolean;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        users: action.payload,
      };

    case 'setComments':
      return {
        ...state,
        comments: action.payload,
      };

    case 'setSelectedPost':
      return {
        ...state,
        selectedPost: action.payload,
      };

    case 'setSelectedUser':
      return {
        ...state,
        selectedUser: action.payload,
      };

    case 'setIsPostSelected':
      return {
        ...state,
        isPostSelected: action.payload,
      };

    case 'setIsFormEnabled':
      return {
        ...state,
        isFormEnabled: action.payload,
      };

    default:
      return state;
  }
}

const initialState: State = {
  users: null,
  comments: [],
  selectedUser: null,
  selectedPost: null,
  isPostSelected: false,
  isFormEnabled: false,
};

export const StateContext = React.createContext(initialState);
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
