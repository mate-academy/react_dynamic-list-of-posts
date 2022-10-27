export enum ErrorMessages {
  None = '',
  ErrorLoadUsers = 'Unable to load users',
  ErrorLoasPosts = 'Unable to load posts',
  ErrorLoadComments = 'Unable to load comments',
  ErrorAddComment = 'Unable to add comment',
  ErrorDeleteComment = 'Unable to delete comment',
}

export type Error = {
  isError: boolean;
  message: ErrorMessages;
};
