/// <reference types="react-scripts" />
interface Post {
  id: number,
  userId: number,
  title: string,
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
