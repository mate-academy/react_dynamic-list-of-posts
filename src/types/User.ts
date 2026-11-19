export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export enum UserErrors {
  noPost = 'No posts yet',
  noSelected = 'No user selected',
  wentWrong = 'Something went wrong!',
}
