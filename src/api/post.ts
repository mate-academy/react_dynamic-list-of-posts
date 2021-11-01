import { BASE_URL } from './api';

export function getPosts(userId: number): Promise<Post[]> {
  return fetch(`${BASE_URL}/posts${userId ? `?userId=${userId}` : ''}`)
    .then(response => response.json())
    .then(posts => posts);
}

export function getPostById(id: number): Promise<Post> {
  return fetch(`${BASE_URL}/posts/${id}`)
    .then(response => response.json())
    .then(post => post);
}
