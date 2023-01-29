export enum ServerErrors {
  Users = 'Unable to load users from the Server',
  Posts = 'Ooops, Unable to load posts from the Server',
  Comments = 'Ooops, Unable to load comments from the Server',
  // eslint-disable-next-line max-len
  NewComment = 'Ooops, your comment has just failed to be published. Please, try again',
  // eslint-disable-next-line max-len
  CommentDeletion = 'Failed to delete the comment, please retry in a few seconds',
}

export enum FormErrors {
  Name = 'Name is required',
  Email = 'Email is required',
  TextArea = 'Enter some text',
}
