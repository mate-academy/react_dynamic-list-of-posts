// eslint-disable-next-line
/// <reference types="react-scripts" />


interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Geo {
  lat: string;
  lng: string;
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

interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PreparedPost extends PostInterface {
  user?: UserInterface;
  comments?: CommentInterface[];
}
