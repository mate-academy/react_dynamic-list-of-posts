/// <reference types="react-scripts" />

interface Post {
  id:number,
  userId: number,
  title: string,
}

interface User {
  id:number,
  username: string,
  name: string,
}

interface Comment {
  body: string,
}
