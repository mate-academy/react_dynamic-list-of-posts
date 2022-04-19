import { Post } from '../types';
import { BASE_URL, getAllPosts, POSTS } from './api';

export function getPosts(userId?: number): Promise<Post[]> {
  if (!userId) {
    return getAllPosts();
  }

  return fetch(`${BASE_URL}${POSTS}?userId=${userId}`)
    .then(response => response.json());
}

export function getPostById(postId: number): Promise<Post> {
  return fetch(`${BASE_URL}${POSTS}/${postId}`)
    .then(response => response.json());
}
