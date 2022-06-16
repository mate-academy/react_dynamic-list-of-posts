interface Post {
  id: number,
  userId: number,
  title: string,
  body: string
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}
