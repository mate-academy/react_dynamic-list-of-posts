import { BASE_URL, request } from './api';
import { Post } from '../types/post';

const ALL_POSTS_URL = `${BASE_URL}/posts`;
const USER_POSTS_URL = (userId: number): string => `${ALL_POSTS_URL}?userId=${userId}`;

export async function getUserPosts(userId: number) {
  return request<Post[]>(userId > 0
    ? USER_POSTS_URL(userId)
    : ALL_POSTS_URL);
}

export async function getPostDetails(postId: number) {
  return request<Post>(`${ALL_POSTS_URL}/${postId}`);
}
