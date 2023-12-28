export interface User {
  id: UserID;
  name: string;
  email: string;
  phone: string;
}

export type UserID = number;
