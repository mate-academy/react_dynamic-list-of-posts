import React, { ReactNode, Reducer, useReducer } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';

export enum ReducerActions {
  setUsers = 'setUsers',
  setIsUsersLoaded = 'setIsUsersLoaded',
  setSelectedUser = 'setSelectedUser',
  setUserPosts = 'setUserPosts',
  setSelectedPost = 'setSelectedPost',
  setIsUserPostsLoading = 'setIsUserPostsLoading',
  setIsUserPostsError = 'setIsUserPostsError',
  setPostComments = 'setPostComments',
  setIsPostsCommentsLoading = 'setIsPostsCommentsLoading',
  setIsPostsCommentsError = 'setIsPostsCommentsError',
  setIsWriteComment = 'setIsWriteComment',
}

type Props = {
  children: ReactNode;
};

type DispatchContextType = (action: DispatchActions) => void;

interface State {
  users: User[] | null;
  isUsersLoaded: boolean;
  selectedUser: User | null;
  userPosts: Post[] | null;
  selectedPost: Post | null;
  isUserPostsLoading: boolean;
  isUserPostsError: boolean;
  postComments: Comment[] | null;
  isPostsCommentsLoading: boolean;
  isPostsCommentsError: boolean;
  isWriteComment: boolean;
}
const initialState: State = {
  users: null,
  isUsersLoaded: false,
  selectedUser: null,
  userPosts: null,
  selectedPost: null,
  isUserPostsLoading: false,
  isUserPostsError: false,
  postComments: null,
  isPostsCommentsLoading: false,
  isPostsCommentsError: false,
  isWriteComment: false,
};

interface DispatchActions {
  type: ReducerActions,
  // eslint-disable-next-line
  payload: any,
}

const reducerFn: Reducer<State, DispatchActions> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ReducerActions.setUsers:
      return {
        ...state,
        users: payload,
      };

    case ReducerActions.setIsUsersLoaded:
      return {
        ...state,
        isUsersLoaded: payload,
      };

    case ReducerActions.setSelectedUser:
      if (state.selectedUser?.id === payload.id) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        selectedUser: payload,
        isUserPostsLoading: false,
        isUserPostsError: false,
        selectedPost: null,
        postComments: null,
      };

      break;

    case ReducerActions.setIsUserPostsLoading:
      return {
        ...state,
        isUserPostsLoading: payload,
      };

    case ReducerActions.setIsUserPostsError:
      return {
        ...state,
        isUserPostsError: payload,
      };

    case ReducerActions.setUserPosts:
      return {
        ...state,
        userPosts: payload,
        isUserPostsLoading: false,
      };

    case ReducerActions.setSelectedPost:
      return {
        ...state,
        selectedPost: payload,
      };

    case ReducerActions.setIsPostsCommentsLoading:
      return {
        ...state,
        isPostsCommentsLoading: payload,
      };

    case ReducerActions.setIsPostsCommentsError:
      return {
        ...state,
        isPostsCommentsError: payload,
      };

    case ReducerActions.setPostComments:
      return {
        ...state,
        postComments: payload,
      };

    case ReducerActions.setIsWriteComment:
      return {
        ...state,
        isWriteComment: payload,
      };

    default:
      return state;
  }
};

export const DispatchContext = React.createContext<
DispatchContextType
>(() => {});

export const StateContext = React.createContext(initialState);

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
