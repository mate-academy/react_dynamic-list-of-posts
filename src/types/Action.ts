/* eslint-disable @typescript-eslint/indent */
import { Comment } from './Comment';
import { ErrorType } from './ErrorType';
import { Post } from './Post';
import { User } from './User';

export type Action =
  | { type: 'LOAD_USERS'; payload: User[] }
  | { type: 'SELECT_USER'; payload: User }
  | { type: 'SET_USER_POSTS'; payload: Post[] }
  | { type: 'SET_SELECTED_POST'; payload: Post | null }
  | { type: 'LOAD_POST_COMMENTS'; payload: Comment[] }
  | { type: 'DELETE_COMMENT'; payload: Comment[] }
  | {
      type: 'SET_ERROR';
      payload: {
        type: ErrorType;
      };
    }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_USER_POSTS_LOADING'; payload: boolean }
  | { type: 'SET_POST_COMMENTS_LOADING'; payload: boolean }
  | { type: 'OPEN_SIDEBAR'; payload: boolean }
  | { type: 'WRITING_COMMENT_STATUS'; payload: boolean };
