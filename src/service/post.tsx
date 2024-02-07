import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts(url: string) {
  return client.get<Post[]>(url);
}

// export function deleteTodos(todoId: string) {
//   return client.delete(todoId);
// }

// export function createTodos({ title, userId, completed }: Omit<User, 'id'>) {
//   return client.post<User>('/todos', { title, userId, completed });
// }

// export function updateTodos(user: User) {
//   return client.patch<User>(`/todos/${user.id}`, user);
// }
