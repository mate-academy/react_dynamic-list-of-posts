export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: Users[];
  comments: Comments[];
}

export interface Users {
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
