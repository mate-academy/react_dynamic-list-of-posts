import { Post } from '../types/Post';
import { request } from './api';

export const getAllPosts = () => request<Post[]>('/posts');
export const getUserPosts = (userId: Post['userId']) => request<Post[]>(`/posts?userId=${userId}`);
export const getPostDetails = (postId: Post['id']) => request<Post>(`/posts/${postId}`);
