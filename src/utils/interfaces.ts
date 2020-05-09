export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
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

export interface CommentType {
  postId: number;
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FullPostType extends PostType {
  user: UserType;
  comments: CommentType[];
}
