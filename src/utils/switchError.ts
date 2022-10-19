import { Error } from '../types/Error';

export const switchError = (type: Error) => {
  switch (type) {
    case Error.NO_POSTS:
      return 'NoPostsYet';

    case Error.GET_USERS:
    case Error.GET_POSTS:
      return 'PostsLoadingError';

    case Error.GET_COMMENTS:
    case Error.ADD_COMMENT:
    case Error.DELETE_COMMENT:
      return 'CommentsError';

    default:
      return null;
  }
};
