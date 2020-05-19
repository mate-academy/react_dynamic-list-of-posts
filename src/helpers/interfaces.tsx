/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export type IUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
};

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
