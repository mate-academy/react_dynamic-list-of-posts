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

// type Comment = {
//   id: number,
//   postId: number,
//   name: string,
//   email: string,
//   body: string,
//   createdAt?: Date,
//   updatedAt?: Date,
// };
