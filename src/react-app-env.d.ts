/// <reference types="react-scripts" />

interface PostItem {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface CommentInfo {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}
