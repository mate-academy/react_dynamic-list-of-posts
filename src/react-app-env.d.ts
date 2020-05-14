// eslint-disable-next-line
/// <reference types="react-scripts" />

interface PostFromServer {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Post extends PostFromServer {
  user: User;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
