export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
  phone: string;
  website: string;
  company: Company;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PreparedPost {
  posts: Post[];
  users: User;
  comments: Comment[];
}
