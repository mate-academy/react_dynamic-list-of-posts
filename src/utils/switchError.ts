import { Error, ErrorElement } from '../types/Error';
import { Post } from '../types/Post';

export const switchError = (
  type: Error,
  error: Error | null,
  element: ErrorElement,
  posts?: Post[],
  selectedUser?: number | null,
) => {
  switch (type) {
    case Error.GET_USERS:
    case Error.GET_POSTS:
      return element === 'MainError'
        ? error === type
        : null;

    case Error.NO_POSTS:
      return element === 'MainError'
        ? !posts?.length
          && selectedUser
          && error === type
        : null;

    case Error.GET_COMMENTS:
    case Error.ADD_COMMENT:
    case Error.DELETE_COMMENT:
      return element === 'CommentsError'
        ? error === type
        : null;

    default:
      return null;
  }
};
