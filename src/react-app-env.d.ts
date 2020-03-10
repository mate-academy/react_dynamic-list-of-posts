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

interface CommentType {
  postId: number;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface FullPostType extends PostType {
  user: UserType;
  comment: CommentType[];
}
