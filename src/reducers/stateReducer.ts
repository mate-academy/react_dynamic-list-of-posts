import { State } from '../types/State';
import { Action } from '../types/Action';

export const stateReducer = (state: State, action: Action): State => {
  let comments = [...state.comments];

  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        users: action.payload,
      };

    case 'setSelectedUser':
      return {
        ...state,
        selectedUser: action.payload,
      };

    case 'setPosts':
      return {
        ...state,
        posts: action.payload,
      };

    case 'setSelectedPost':
      return {
        ...state,
        selectedPost: action.payload,
      };

    case 'setIsLoadingPosts':
      return {
        ...state,
        isLoadingPosts: action.payload,
      };

    case 'setComments':
      comments = action.payload;

      return {
        ...state,
        comments,
      };

    case 'addComment':
      comments.push(action.payload);

      return {
        ...state,
        comments,
      };

    case 'deleteComment':
      comments = comments.filter(comment => comment.id !== action.payload.id);

      return {
        ...state,
        comments,
      };

    case 'setIsLoadingComments':
      return {
        ...state,
        isLoadingComments: action.payload,
      };

    case 'setIsOpenForm':
      return {
        ...state,
        isOpenForm: action.payload,
      };

    case 'setError':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
