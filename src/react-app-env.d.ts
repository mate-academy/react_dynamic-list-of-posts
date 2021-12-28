interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface Comment {
  body: string,
  id: number,
}

interface CommentBody {
  postId?: number,
  name: string,
  body: string,
  email: string,
}
