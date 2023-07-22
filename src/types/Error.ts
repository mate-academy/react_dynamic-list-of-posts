export enum ErrorMessage {
  None = '',
  UserPosts = 'Unable to get a user posts',
  Delete = 'Unable to delete comment',
  Add = 'Unable to add new comment',
}

export interface ErrorForm {
  name: boolean,
  email: boolean,
  comment: boolean,
}
