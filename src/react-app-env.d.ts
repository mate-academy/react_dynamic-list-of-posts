// eslint-disable-next-line
/// <reference types="react-scripts" />
interface PostType {
  userId: number;
  id: number;
  title: string;
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

type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
};

interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
