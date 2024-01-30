import React, { Dispatch, useReducer } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

interface State {
  selectedUser: User | null;
  userPosts: Post[] | [];
  errorMessage: string;
  selectedPost: Post | null;
}

const initialState: State = {
  selectedUser: null,
  userPosts: [],
  errorMessage: '',
  selectedPost: null,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext((() => { }) as Dispatch<Action>);

type Action
  = { type: 'selectUser', payload: User }
  | { type: 'setUserPosts', payload: Post[] }
  | { type: 'setSeletedPost', payload: Post | null }
  | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selectUser':
      return {
        ...state,
        selectedUser: action.payload,
      };

    case 'setSeletedPost':
      return {
        ...state,
        selectedPost: action.payload,
      };

    case 'setUserPosts':
      return {
        ...state,
        userPosts: action.payload,
      };

    case 'setError':
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode,
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
