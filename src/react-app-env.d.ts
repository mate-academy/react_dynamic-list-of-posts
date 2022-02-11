/// <reference types="react-scripts" />

interface Post {
  userId: number,
  title: string,
  id: number,
  body?: string,
}

interface PostComment {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  email: string,
}

type FormInput = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
