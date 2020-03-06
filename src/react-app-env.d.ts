// eslint-disable-next-line
/// <reference types="react-scripts" />


interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface GeoInterface {
  lat: string;
  lng: string;
}

interface AddressInterface {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoInterface;
}

interface CompanyInterface {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressInterface;
  phone: string;
  website: string;
  company: CompanyInterface;
}

interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PreparedPostInterface extends PostInterface {
  user?: UserInterface;
  comments?: CommentInterface[];
}
