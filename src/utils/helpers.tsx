// import { Post } from '../types/Post';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addNewComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};

// Add more methods here

// export const createTodo = (userId: number, data: Omit<Todo, 'id'>) => {
//   return client.post<Todo>(`/todos?userId=${userId}`, data);
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete<number>(`/todos/${todoId}`);
// };

// export const editTodo = (todoId: number, data: Partial<Todo>) => {
//   return client.patch<Todo>(`/todos/${todoId}`, data);
// };
