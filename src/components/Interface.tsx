export type StateApp = {
  posts: Post[];
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  searchQuery: string;
};

export type StateSearch = {
  searchQuery: string;
};

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: User;
  comments: Comment[];
}

export interface User {
  [key: string]: number | string | Address | Company;
  id: number;
  address: Address;
  company: Company;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
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
