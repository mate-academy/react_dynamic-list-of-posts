// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: srting;
  username: srting;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Comment {
  postId: number;
  id: number;
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

interface PreparedPost {
  user: User;
  comments: Comment[];
  userId: number;
  id: number;
  title: string;
  body: string;
}
