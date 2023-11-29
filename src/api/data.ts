import { Comment } from 'postcss';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

// export const deleteTodos = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };

// export const addTodos = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
//   return client.post<Todo>('/todos', { userId, title, completed });
// };

// export const updateTodos = (todo: Todo) => {
//   return client.patch<Todo>(`/todos/${todo.id}`, todo);
// };
