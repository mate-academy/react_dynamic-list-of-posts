export interface PreparedPosts extends Post {
  comments: Comment[];
  user: User;
}

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface Comment {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

interface Address {
  city: string;
  createdAt: string;
  id: number;
  street: string;
  suite: string;
  updatedAt: string;
  userId: number;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}
