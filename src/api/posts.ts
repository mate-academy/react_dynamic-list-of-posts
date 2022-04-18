import { Post } from '../types/post';
import { request } from './api';

export const getPosts = (): Promise<Post[]> => request('/posts');

export const getUserPosts = (userId: number): Promise<Post[]> => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number): Promise<Post> => request(`/posts/${postId}`);
