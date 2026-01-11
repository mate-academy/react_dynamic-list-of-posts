import { Action, AppState } from './types';

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SELECT_USER':
      return {
        ...state,
        selectedUserId: action.userId,
        posts: [],
        selectedPostId: null,
        postsNotification: null,
        comments: [],
        commentsNotification: null,
      };

    case 'SET_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.posts,
        postsNotification:
          action.posts.length === 0
            ? { type: 'warning', message: 'No posts yet' }
            : null,
      };

    case 'SET_POSTS_ERROR':
      return {
        ...state,
        postsNotification: {
          type: 'error',
          message: 'Something went wrong!',
        },
      };

    case 'SET_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.comments,
        commentsNotification:
          action.comments.length === 0
            ? { type: 'warning', message: 'No comments yet' }
            : null,
      };

    case 'SET_COMMENTS_ERROR':
      return {
        ...state,
        commentsNotification: {
          type: 'error',
          message: 'Something went wrong',
        },
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.comment],
        commentsNotification: null,
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.commentId),
      };

    case 'SET_SELECTED_POST':
      return {
        ...state,
        selectedPostId: action.postId,
      };

    default:
      return state;
  }
}
