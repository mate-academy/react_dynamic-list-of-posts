interface Address {
  id: number,
  userId: number,
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  createdAt: string,
  updatedAt: string
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string,
  address: Address
}
