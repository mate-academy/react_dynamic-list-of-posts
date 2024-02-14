import { Action } from '../types/Action';
import { Error } from '../types/Error';
import { State } from '../types/State';

export const reduser = (state: State, action: Action): State => {
  switch (action.type) {
    case 'loadUsers':

      return {
        ...state,
        users: action.payload,
      };

    case 'error':

      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'selectUser':

      return {
        ...state,
        selectedUser: action.payload,
        userPosts: null,
        selectedPost: null,
        errorMessage: Error.None,
      };

    case 'loadPosts':

      return {
        ...state,
        userPosts: action.payload,
      };

    case 'selectPost':

      return {
        ...state,
        selectedPost: action.payload,
        postComments: null,
        errorMessage: Error.None,
      };

    case 'loadComments':

      return {
        ...state,
        postComments: action.payload,
      };

    case 'addComment': {
      const { postComments } = state;

      return {
        ...state,
        postComments: postComments
          ? [...postComments, action.payload]
          : [action.payload],
      }; }

    case 'deleteComment': {
      const { postComments } = state;
      const updatedComments = postComments?.filter(
        c => c.id !== action.payload,
      );

      return {
        ...state,
        postComments: updatedComments || postComments,
      }; }

    default:
      return state;
  }
};
