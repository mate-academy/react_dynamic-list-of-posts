// import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

// export const createTodo = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
//   return client.post<Todo>('/todos', { userId, title, completed });
// };

// export const deleteTodo = (id: number) => {
//   return client.delete(`/todos/${id}`);
// };

// export const updateTodo = ({
//   id, userId, title, completed,
// }: Todo) => {
//   return client.patch<Todo>(`/todos/${id}`, { userId, title, completed });
// };
