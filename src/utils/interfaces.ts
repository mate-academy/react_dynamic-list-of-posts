export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressType;
  phone: string;
  website: string;
  company: CompanyType;
}

interface AddressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoType;
}

interface GeoType {
  lat: number;
  lng: number;
}

interface CompanyType {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PreparedPostType extends PostType {
  author: UserType;
  postComments: CommentType[];
}
