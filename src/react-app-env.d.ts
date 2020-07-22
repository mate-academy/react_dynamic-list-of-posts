// eslint-disable-next-line
/// <reference types="react-scripts" />

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

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Comment {
  postId: number;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface ListofPost extends Post {
  user: UserType;
  comment: CommentType[];
}
