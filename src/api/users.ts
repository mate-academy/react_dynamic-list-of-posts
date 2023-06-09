import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const usersFromServer = client
  .get<User[]>('/users');
// export const createTodoOnServer = (title: string) => client
//   .post<User>('/todos', {
//   title,
//   userId: USER_ID,
//   completed: false,
// });
// export const deleteTodoOnServer = (todoId: number) => client
//   .delete(`/todos/${todoId}`);
// export const toggleTodoOnServer = (todoId: number, completed: boolean) => client
//   .patch<User>(`/todos/${todoId}`, { completed: !completed });
// export const updateTodoOnServer = (todoId: number, title: string) => client
//   .patch<User>(`/todos/${todoId}`, { title });
