import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

// export const createTodo = ({ name, email, phone }: Omit<User, 'id'>) => {
//   return client.post<User>(`/todos`, { name, email, phone });
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };

// export const updateTodo = ({ id, title, completed, userId }: User) => {
//   return client.patch<User>(`/todos/${id}`, { title, completed, userId });
// };
// Add more methods here
