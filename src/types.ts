export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressProps;
  phone: string;
  website: string;
  company: CompanyProps;
}

interface CompanyProps {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface GeoProps {
  lat: number;
  lng: number;
}

interface AddressProps {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoProps;
}

export interface CommentProps {
  postId: number;
  id: string;
  name: string;
  email: string;
  body: string;
}

export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface AllPostProps extends PostProps {
  user: UserProps;
  comments: CommentProps[];
}
