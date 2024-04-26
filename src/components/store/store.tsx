import React, { useReducer } from 'react';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

interface State {
  users: User[];
  userPosts: Post[];
  postComments: Comment[];
  tempComment: Comment;
  activeUserId: number;
  activePostId: number;
  vaitingUserPost: boolean;
  vaitingPostComments: boolean;
  errorPost: boolean;
  errorComment: boolean;
}

export type Action =
  | { type: 'SET_USERS'; users: User[] }
  | { type: 'SET_POSTS'; posts: Post[] }
  | { type: 'SET_COMMENTS'; comments: Comment[] }
  | { type: 'SET_ACTIVEUSERID'; id: number }
  | { type: 'SET_ACTIVEPOSTID'; id: number }
  | { type: 'SET_VAITINGPOSTS'; isUse: boolean }
  | { type: 'SET_VAITINGCOMMENTS'; isUse: boolean }
  | { type: 'SET_ERRORPOST'; isUse: boolean }
  | { type: 'SET_ERRORCOMMENTS'; isUse: boolean }
  | { type: 'BACK_DELETECOMMENT' }
  | { type: 'DELETE_COMMENT'; id: number }
  | { type: 'ADD_COMMENT'; comment: Comment };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      };

    case 'SET_POSTS':
      return {
        ...state,
        userPosts: action.posts,
      };

    case 'SET_COMMENTS':
      return {
        ...state,
        postComments: action.comments,
      };

    case 'SET_ACTIVEUSERID':
      return {
        ...state,
        activeUserId: action.id,
      };

    case 'SET_ACTIVEPOSTID':
      return {
        ...state,
        activePostId: action.id,
      };

    case 'SET_VAITINGPOSTS':
      return {
        ...state,
        vaitingUserPost: action.isUse,
      };

    case 'SET_VAITINGCOMMENTS':
      return {
        ...state,
        vaitingPostComments: action.isUse,
      };

    case 'SET_ERRORPOST':
      return {
        ...state,
        errorPost: action.isUse,
      };

    case 'SET_ERRORCOMMENTS':
      return {
        ...state,
        errorComment: action.isUse,
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        postComments: state.postComments.filter(comm => comm.id !== action.id),
        tempComment: state.postComments.filter(
          comm => comm.id === action.id,
        )[0],
      };

    case 'BACK_DELETECOMMENT':
      return {
        ...state,
        postComments: [...state.postComments, { ...state.tempComment }].sort(
          (comm1, comm2) => comm1.id - comm2.id,
        ),
        tempComment: {
          id: 0,
          postId: 0,
          name: '',
          email: '',
          body: '',
        },
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        postComments: [...state.postComments, { ...action.comment }],
      };

    default:
      return state;
  }
};

const initialState: State = {
  users: [],
  userPosts: [],
  postComments: [],
  tempComment: {
    id: 0,
    postId: 0,
    name: '',
    email: '',
    body: '',
  },
  activeUserId: 0,
  activePostId: 0,
  vaitingUserPost: false,
  vaitingPostComments: false,
  errorPost: false,
  errorComment: false,
};

const defaultDispatch: React.Dispatch<Action> = () => {};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};

export const GlobalstateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
