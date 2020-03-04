export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

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

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: number;
  lng: number;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PreparedPost extends PostType {
  author: UserType;
  postComments: CommentType[];
}
