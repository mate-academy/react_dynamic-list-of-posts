import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (PostId: number) => {
  return client.get<Comment[]>(`/comments?postId=${PostId}`);
};
// export const sendTodo = (userId: number, data: Todo) => {
//   return client.post<Todo>(`/todos?userId=${userId}`, data);
// };

// export const patchTodo = (todo: Todo) => {
//   return client.patch<Todo>(`/todos/${todo.id}`, todo);
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };
