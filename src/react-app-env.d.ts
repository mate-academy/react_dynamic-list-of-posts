
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostFromServer {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}
