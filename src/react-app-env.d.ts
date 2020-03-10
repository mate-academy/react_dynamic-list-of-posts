// eslint-disable-next-line
/// <reference types="react-scripts" />

interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserGeo;
}

interface UserGeo {
  lat: string;
  lng: string;
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

interface PostsInterface extends PostInterface {
  user: UserInterface;
  comments: CommentInterface[];
}
