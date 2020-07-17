export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suit: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostListInterface extends PostInterface {
  user: UserInterface;
  comments: CommentInterface[];
}
