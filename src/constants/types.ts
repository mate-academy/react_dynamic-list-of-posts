export interface CommentInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostInterface {
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

export interface PostsWithUserAndComments extends PostInterface{
  user: UserInterface;
  comments: CommentInterface[];
}
