import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { ENDPOINTS } from '../helpers/endPointsHelper';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`${ENDPOINTS.posts}?userId=${userId}`);
};

export const createPost = (post: Omit<Post, 'id'>) => {
  return client.post<Post>(`${ENDPOINTS.posts}`, post);
};

export const editPost = (post: Post) => {
  return client.patch<Post>(`${ENDPOINTS.posts}/${post.id}`, post);
};

export const deletePost = (postId: number) => {
  return client.delete(`${ENDPOINTS.posts}/${postId}`);
};
