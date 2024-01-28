import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export function getUsers() {
  return client.get<User[]>('/users')
    .catch(err => {
      throw err;
    });
}

export function getPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`)
    .catch(err => {
      throw err;
    });
}
