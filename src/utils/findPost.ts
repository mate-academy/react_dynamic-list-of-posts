import { Post } from '../types/Post';

export const findPost = (posts: Post[], postId: number) =>
  posts.find(post => post.id === postId);
