/// <reference types="react-scripts" />
interface Adress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
}

interface Geo {
  lat: string,
  lng: string,
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Adress;
  phone: string;
  website: string;
  company: Company;
}

interface Comments {
  postId: number | null;
  id: number | null;
  name: string;
  email: string;
  body: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface FullPost extends Post {
  user: User | null;
  comment: Comment[] | null;
}

interface NewComment {
  postId: number | null;
  name: string;
  email: string;
  body: string;
}
