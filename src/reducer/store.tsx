import React, { useReducer } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export enum ActionTypes {
  selectUser,
  getAllUsers,
  selectPost,
  getAllPosts,
  getComments,
  setNotification,
}

export enum NotificationTypes {
  danger = 'is-danger',
  warning = 'is-warning',
}

export type Action = { type: ActionTypes.selectUser, user: User | null } |
{ type: ActionTypes.getAllUsers, users: User[] | null } |
{ type: ActionTypes.selectPost, post: Post | null } |
{ type: ActionTypes.getAllPosts, posts: Post[] | null } |
{ type: ActionTypes.getComments, comments: Comment[] | null } |
{
  type: ActionTypes.setNotification,
  notificationType: NotificationTypes.danger | NotificationTypes.warning | null
  notificationMessage: string
  notificationData: string
};

type State = {
  selectedUser: User | null
  usersList: User[] | null
  selectedPost: Post | null
  postsList: Post[] | null
  commentsList: Comment[] | null
  notificationType: NotificationTypes.danger | NotificationTypes.warning | null
  notificationMessage: string
  notificationData: string
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.selectUser:
      return {
        ...state,
        selectedUser: action.user,
      };

    case ActionTypes.getAllUsers:
      return {
        ...state,
        usersList: action.users,
      };

    case ActionTypes.selectPost:
      return {
        ...state,
        selectedPost: action.post,
      };

    case ActionTypes.getAllPosts:
      return {
        ...state,
        postsList: action.posts,
      };

    case ActionTypes.getComments:
      return {
        ...state,
        commentsList: action.comments,
      };

    case ActionTypes.setNotification:
      return {
        ...state,
        notificationType: action.notificationType,
        notificationMessage: action.notificationMessage,
        notificationData: action.notificationData,

      };
    default:
      return state;
  }
}

const initialState: State = {
  selectedUser: null,
  usersList: null,
  selectedPost: null,
  postsList: null,
  commentsList: null,
  notificationType: null,
  notificationMessage: '',
  notificationData: '',
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {});

type Props = {
  children: React.ReactNode
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
