// eslint-disable-next-line
/// <reference types="react-scripts" />
interface PostType extends PostFromServer {
  user: UserType;
  comments: CommentType[];
}

interface PostFromServer {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserType {
  id: number;
  name: string;
  username?: string;
  email: string;
  address: UserAddress;
}

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface CommentType {
  id: number;
  postId: number;
  body: string;
  name: string;
  email: string;
}
