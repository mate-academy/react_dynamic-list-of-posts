import { requeste } from './api';

export const getAllPosts = () => requeste('/posts');

export const getUserPosts = (userId: number) => requeste(`/posts?userId=${userId}`);

export const getPostDetails = (postId: number) => requeste(`/posts/${postId}`);
