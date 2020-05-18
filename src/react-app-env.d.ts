// eslint-disable-next-line
/// <reference types="react-scripts" />


interface Post extends PostFromServer {
  user?: User;
  userComments?: Comment[];
}

interface PostFromServer {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: Address;
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


interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
