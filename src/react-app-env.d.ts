// eslint-disable-next-line
/// <reference types="react-scripts" />

interface ButtonProps {
  beforeLoaded: () => void;
  afterLoaded: (list: PreparedProps[]) => void;
}

type PreparedProps = {
  id: number;
  title: string;
  body: string;
  user?: {
    name: string | undefined;
    email: string | undefined;
    street: string | undefined;
  };
  comments: Comments[];
};

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
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

interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
