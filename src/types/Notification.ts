export enum Error {
  GenError = 'Something went wrong!',
  EmptyInputError = 'Title should not be empty',
  PostsError = 'Unable to load user posts',
  CommentsError = 'Unable to load comments of selected post',
}

export enum Warning {
  NoPost = 'No posts yet',
  NoComment = 'No comments yet',
}
