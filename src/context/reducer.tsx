import { Action } from '../types/Action';
import { State } from '../types/State';

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        users: action.payload,
      };
    case 'selectUser':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'setPosts':
      return {
        ...state,
        posts: action.payload,
      };
    case 'selectPost':
      return {
        ...state,
        selectedPost: action.payload,
      };
    case 'setComments':
      return {
        ...state,
        comments: action.payload,
      };
    case 'addComment':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case 'deleteComment':
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
