import React from 'react';

import { State } from '../types/State';
import { Action } from '../types/Action';

const initialState: State = {
  users: [],
  selectedUser: null,
  userPosts: [],
  selectedPost: null,
  comments: [],
  error: '',
  sidebarError: '',
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case 'SET_USERS':
      return {
        ...state,
        users: payload,
      };

    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: payload,
      };

    case 'SET_USER_POSTS':
      return {
        ...state,
        userPosts: payload,
      };

    case 'SET_SELECTED_POST':
      return {
        ...state,
        selectedPost: state.userPosts.find(post => post.id === payload) || null,
      };

    case 'SET_COMMENTS':
      return {
        ...state,
        comments: payload,
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, payload],
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== payload),
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: payload,
      };

    case 'SET_SIDEBAR_ERROR':
      return {
        ...state,
        sidebarError: payload,
      };

    default:
      return state;
  }
};

const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DispatchContext = React.createContext((_: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useGlobalStateContext = () => React.useContext(StateContext);
export const useGlobalDispatchContext = () => React.useContext(DispatchContext);
