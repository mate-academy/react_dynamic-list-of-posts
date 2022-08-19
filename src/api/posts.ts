import { Post } from '../types/post';

const API_URL = 'https://mate.academy/students-api';

export function getUserPosts(userId: string): Promise<Post[]> {
  return fetch(`${API_URL}/posts?userId=${userId}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function getAllPosts(): Promise<Post[]> {
  return fetch(`${API_URL}/posts`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function getPostDetails(postId: string): Promise<Post> {
  return fetch(`${API_URL}/posts/${postId}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

// https://mate.academy/students-api/posts/:47
