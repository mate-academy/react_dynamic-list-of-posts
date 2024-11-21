import { Post } from './Post';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  posts?: Post[];
}
