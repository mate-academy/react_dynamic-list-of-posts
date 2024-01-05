import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const addPosts = (data: Post) => {
  return client.post<Post>('/posts', data);
};

export const deletePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};

export const patchTodo = (data: Post) => {
  return client.patch<Post>(`/posts/${data.id}`, data);
};
