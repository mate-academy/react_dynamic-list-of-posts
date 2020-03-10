interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Posts = Post[];

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

type Users = User[];

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type Comments = Comment[];

interface PreparedPost extends Post {
  user: User;
  comments: Comments;
}

type PreparedPosts = PreparedPost[];
