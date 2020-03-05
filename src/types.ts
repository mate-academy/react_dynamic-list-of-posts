export interface CommentInterface {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Сompany {
  name: string
  catchPhrase: string
  bs: string
}

export interface UserInterface {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Сompany
}

export interface PreparedPost {
  userId: number
  id: number
  title: string
  body: string
  user?: UserInterface
  comments?: CommentInterface[]
}
