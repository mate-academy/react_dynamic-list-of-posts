import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { State } from '../types/State';
import { User } from '../types/User';

export type Action =
  { type: 'getUsers', payload: User[] }
  | { type: 'getPosts', payload: Post[] }
  | { type: 'getComments', payload: Comment[] }
  | { type: 'newComment', payload: CommentData }
  | { type: 'addComment', payload: Comment }
  | { type: 'commentForDelete', payload: Comment | null }
  | { type: 'deleteComment', payload: number }
  | { type: 'currentUser', payload: User | null }
  | { type: 'currentPost', payload: Post | null }
  | { type: 'loadingPosts', payload: boolean }
  | { type: 'loadingComments', payload: boolean }
  | { type: 'loadingAddComment', payload: boolean }
  | { type: 'openComments', payload: boolean }
  | { type: 'showForm', payload: boolean }
  | { type: 'errorGetPosts', payload: boolean }
  | { type: 'errorGetComments', payload: boolean };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'getUsers':
      return {
        ...state,
        users: action.payload,
      };

    case 'commentForDelete':
      return {
        ...state,
        commentForDelete: action.payload,
      };

    case 'deleteComment':
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };

    case 'getPosts':
      return {
        ...state,
        posts: action.payload,
      };

    case 'getComments':
      return {
        ...state,
        comments: action.payload,
      };

    case 'newComment':
      return {
        ...state,
        newComment: action.payload,
      };

    case 'addComment':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case 'openComments':
      return {
        ...state,
        openCommentsButton: action.payload,
      };

    case 'currentUser':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'currentPost':
      return {
        ...state,
        currentPost: action.payload,
      };

    case 'loadingPosts':
      return {
        ...state,
        isLoaderPosts: action.payload,
      };

    case 'loadingComments':
      return {
        ...state,
        isLoaderComments: action.payload,
      };

    case 'loadingAddComment':
      return {
        ...state,
        isLoaderAddComment: action.payload,
      };

    case 'errorGetPosts':
      return {
        ...state,
        errorGetPosts: action.payload,
      };

    case 'errorGetComments':
      return {
        ...state,
        errorGetComments: action.payload,
      };

    case 'showForm':
      return {
        ...state,
        showFormWriteComment: action.payload,
      };

    default:
      return state;
  }
}
