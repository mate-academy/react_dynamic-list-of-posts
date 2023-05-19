import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
}; // return userList

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}; // return list of user posts

export const getComment = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postTodos = (userId: number, title: string) => {
  return client.post<User>(`/todos?userId=${userId}`, {
    userId,
    title,
    completed: false,
  });
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const patchTodos = (id: number, data: Partial<User>) => {
  return client.patch<User>(`/todos/${id}`, data);
};
