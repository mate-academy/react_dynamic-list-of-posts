interface Geo {
  lat?: string;
  lng?: string;
}

interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface PreparedPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User | undefined;
  commentList: CommentInteface[];
}

export interface Props {
  posts: PreparedPosts[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentInteface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentListProps {
  commentList: CommentInteface[];
}

export interface CommentProps {
  comment: CommentInteface;
}

export interface PostProps {
  post: PreparedPosts;
}

export interface UserProps {
  user: User | undefined;
}
