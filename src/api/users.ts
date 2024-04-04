import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
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
