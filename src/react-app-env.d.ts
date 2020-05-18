interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  geo: Geo;
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

interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}
