export enum ApiEndpoint {
  Users = '/users',
  PostsByUser = '/posts?userId=',
  GetCommentsByPost = '/comments?postId=',
  DeleteCommentById = '/comments/',
  PostComment = '/comments',
}
