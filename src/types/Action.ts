import { Post } from './Post';
import { User } from './User';
import { Comment } from './Comment';
import { LoadingType } from './LoadingType';
import { ErrorMessage } from './ErrorMessage';
import { ActionMap } from '../utils/ActionMap';

export enum ActionType {
  SetUsers = 'SET_USERS',
  SetPosts = 'SET_POSTS',
  SetComments = 'SET_COMMENTS',
  SetSelectedUser = 'SET_SELECTED_USER',
  SetSelectedPost = 'SET_SELECTED_POST',
  SetLoadingType = 'SET_LOADING_TYPE',
  SetErrorMessage = 'SET_ERROR_MESSAGE',
  AddComment = 'ADD_COMMENT',
  DeleteComment = 'DELETE_COMMENT',
  RestoreComment = 'RESTORE_COMMENT',
}

type ActionPayload = {
  [ActionType.SetUsers]: User[];
  [ActionType.SetPosts]: Post[];
  [ActionType.SetComments]: Comment[];
  [ActionType.SetSelectedUser]: User | null;
  [ActionType.SetSelectedPost]: Post | null;
  [ActionType.SetLoadingType]: LoadingType;
  [ActionType.SetErrorMessage]: ErrorMessage;
  [ActionType.AddComment]: Comment;
  [ActionType.DeleteComment]: number;
  [ActionType.RestoreComment]: { comment: Comment; index: number };
};

export type Action = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];
