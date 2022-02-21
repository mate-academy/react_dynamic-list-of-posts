import { request } from './api';

export const getUserPosts = (userId: number): Promise<Post[]> => request(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number):Promise<Post> => request(`/posts/${postId}`);
