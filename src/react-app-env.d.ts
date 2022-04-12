/// <reference types="react-scripts" />
interface Post {
  'id': number,
  'userId': number,
  'title': string,
  'body': string,
}

interface User {
  'id': number,
  'name': string,
}

interface NewComment {
  'postId': number,
  'name': string,
  'email': string,
  'body': string,
}

interface PostComment extends NewComment {
  readonly 'id': number,
}
