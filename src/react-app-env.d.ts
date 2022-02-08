/// <reference types="react-scripts" />

interface Post {
  userId: number,
  title: string,
  id: number,
}

interface PostComment {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface NewComment{
  postId: number,
  name: string,
  email: string,
  body: string,
}

type FormInput = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
