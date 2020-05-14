// eslint-disable-next-line
/// <reference types="react-scripts" />

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: CommentProps[];
  author: UserProps;
}

interface UserProps {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: AddressProps;
  phone?: number;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

interface CommentProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface AddressProps {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: number;
  geo?: GeoProps;
}

interface GeoProps {
  lat?: number;
  lng?: number;
}
