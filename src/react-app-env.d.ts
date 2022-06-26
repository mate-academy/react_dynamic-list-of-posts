interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface NewComment {
  postId: number | null;
  name: string;
  email: string;
  body: string;
}

interface IComment {
  postId: number | null;
  id: number | null;
  name: string;
  email: string;
  body: string;
}
