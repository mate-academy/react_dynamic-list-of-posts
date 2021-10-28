/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  body: string,
  title: string,
}

interface BaseComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface PostComment extends BaseComment {
  id: number,
}
