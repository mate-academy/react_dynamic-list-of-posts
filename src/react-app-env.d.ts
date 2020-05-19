// eslint-disable-next-line
/// <reference types="react-scripts" />


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


interface Address {
  street: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;

}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostWithComments extends Post {
  user: User;
  comments: Comment[];
}
