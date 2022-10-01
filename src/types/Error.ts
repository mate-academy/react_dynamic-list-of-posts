export enum Error {
  GET_USERS = 'Unable to get users',
  NO_POSTS = 'No posts yet',
  GET_POSTS = 'Something went wrong!',
  GET_COMMENTS = 'Unable to get comments',
  ADD_COMMENT = 'Unable to add comment',
  DELETE_COMMENT = 'Unable to delete comment',
}

export type ErrorElement = 'MainError' | 'CommentsError';

export type ErrorType = 'NoPostsYet' | 'PostsLoadingError' | 'CommentsError';
