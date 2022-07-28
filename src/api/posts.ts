import { Post } from '../types/Post';
import { getData } from './api';

export const getAllPosts = () => getData<Post[]>('/todos');

export const getUserPosts = (userId: number) => getAllPosts()
  .then(posts => posts
    .filter(post => post.userId === userId));

export const getPostDetails = (postId: number) => getData<Post>(`/posts/${postId}`);
