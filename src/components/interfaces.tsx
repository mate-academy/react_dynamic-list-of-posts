export interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  [key: string]: number | string | Address | Company;
  id: number;
  address: Address;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comments[];
}

export interface AppState {
  posts: Post[];
  isLoading: boolean;
  isLoaded: boolean;
  downloadError: boolean;
  filteredValue: string;
  searchValue: string;
}
