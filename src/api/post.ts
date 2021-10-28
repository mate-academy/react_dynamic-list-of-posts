import { BASE_URL } from './api';

export function getPosts(userId = 0): Promise<Post[]> {
  return fetch(`${BASE_URL}/posts${userId ? `?userId=${userId}` : ''}`)
    .then(response => response.json())
    .then(posts => posts);
}

export function getPostDetails(postId: number): Promise<Post> {
  return fetch(`${BASE_URL}/posts/${postId}`)
    .then(response => response.json())
    .then(post => post);
}
