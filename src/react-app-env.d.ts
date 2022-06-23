/// <reference types="react-scripts" />
interface UserPost {
  id: number,
  userId: number,
  title: string,
}

interface User {
  id: number,
  name: string,
  email: string,
}

interface UserWithPosts extends User {
  posts: UserPost[],
}

interface Comment {
  id: number,
  postId: number,
  body: string,
}
