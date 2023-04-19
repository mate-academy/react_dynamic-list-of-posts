import { Post } from './types/Post';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Comment } from './types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (comm: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comm);
};

export const deleteComment = (comId: number) => {
  return client.delete(`/comments/${comId}`);
};

// export const updateTodo = (todo: Todo) => {
//   return client.patch<Todo>(`/todos/${todo.id}`, todo);
// };
