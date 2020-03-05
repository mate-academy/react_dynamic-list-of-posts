// eslint-disable-next-line
/// <reference types="react-scripts" />

interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: CommentInterface[];
  user: UserInterface;
}

interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AdressInterface;
  phone: string;
  website: string;
  company: CompanyInterface;
}

interface AdressInterface {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoInterface;
}

interface GeoInterface {
  lat: string;
  lng: string;
}

interface CompanyInterface {
  name: string;
  catchPhrase: string;
  bs: string;
}
