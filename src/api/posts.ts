import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

// export const addTodo = (todo: Omit<Todo, 'id'>) => {
//   return client.post<Todo>(`/todos`, todo);
// };

// export const editTodos = ({ id, userId, title, completed }: Todo) => {
//   return client.patch<Todo>(`/todos/${id}`, {
//     id,
//     userId,
//     title,
//     completed,
//   });
// };

// export const deleteTodos = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };
