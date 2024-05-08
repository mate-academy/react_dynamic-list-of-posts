import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

// export const createTodos = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
//   return client.post<Post>('/todos', { userId, title, completed });
// };

// export const deleteTodo = (userId: number) => {
//   return client.delete(`/posts/${userId}`);
// };

// export const updateTodo = ({ id, userId, title, completed }: Post) => {
//   return client.patch<Post>(`/posts/${id}`, { id, userId, title, completed });
// };
