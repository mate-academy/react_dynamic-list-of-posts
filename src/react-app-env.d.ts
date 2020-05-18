// eslint-disable-next-line
/// <reference types="react-scripts" />
interface Ikey {
  [key: string]: T;
}

interface Post extends Ikey {
  id: number;
  title: string;
  body: string;
  userId: number;
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
  photo?: string;
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

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: string;
  lng: string;
}
