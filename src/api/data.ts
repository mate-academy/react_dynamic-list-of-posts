import { User } from '../types/User';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
}; // return userList

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}; // return list of user posts

export const getCompletedTodos = (userId: number) => {
  return client.get<User[]>(`/todos?userId=${userId}&completed=true`);
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
