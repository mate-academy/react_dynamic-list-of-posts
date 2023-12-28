export enum ErrorType {
  none = '',
  loadPosts = 'Failed to load posts, try again later',
  loadComments = 'Failed to load comments, try again later',
  deleteComment = 'Failed to delete comment',
  // eslint-disable-next-line
  submitForm = 'There was a problem submitting the form, please try again later',
  requiredField = 'This field is mandatory, please fill it out',
}
