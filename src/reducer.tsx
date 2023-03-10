import React, { createContext, useReducer } from 'react';
import { Comment } from './types/Comment';
import { Error } from './types/Error';
import { Post } from './types/Post';
import { User } from './types/User';

type State = {
  selectedUser: User | null,
  activeList: boolean,
  error: Error | null,
  listPostsUser: Post[] | [],
  load: { type: string, active: boolean },
  selectedPost: Post | null,
  commentsPost: Comment[] | [],
  activeForm: boolean,
};

type Action =
  { type: 'selectUser', user: User }
  | { type: 'active', show: boolean }
  | { type: 'error', error: Error | null }
  | { type: 'postsUser', posts: Post[] }
  | { type: 'loadData', objectLoad: { type: string, active: boolean } }
  | { type: 'selectPost', post: Post | null }
  | { type: 'commentsPost', comments: Comment[] }
  | { type: 'activeForm', active: boolean };

export const initialState: State = {
  selectedUser: null,
  activeList: false,
  error: null,
  listPostsUser: [],
  load: { type: '', active: false },
  selectedPost: null,
  commentsPost: [],
  activeForm: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'selectUser':
      return {
        ...state,
        selectedUser: action.user,
      };
    case 'active':
      return {
        ...state,
        activeList: action.show,
      };
    case 'error':
      return {
        ...state,
        error: action.error,
      };
    case 'postsUser':
      return {
        ...state,
        listPostsUser: action.posts,
      };
    case 'loadData':
      return {
        ...state,
        load: action.objectLoad,
      };
    case 'selectPost':
      return {
        ...state,
        selectedPost: action.post,
      };
    case 'commentsPost':
      return {
        ...state,
        commentsPost: action.comments,
      };
    case 'activeForm':
      return {
        ...state,
        activeForm: action.active,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<
[State, React.Dispatch<Action>]
>([initialState, (obj:Action) => obj]);

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default StateProvider;
