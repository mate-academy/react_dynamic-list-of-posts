import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = async (userId?: number): Promise<Post[]> => {
  if (userId) {
    return client.get<Post[]>(`/posts?userId=${userId}`);
  }

  return client.get<Post[]>('/posts');
};

export const addPost = (post: Post) => {
  return client.post<Post[]>('/posts', post);
};

export const updatePost = (postId: number, updatedPost: Partial<Post>) => {
  return client.patch<Post>(`/posts/${postId}`, updatedPost);
};

export const deletePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};
