import { client } from './utils/fetchClient';
import { Comment } from './types/Comment';
import { User } from './types/User';
import { Error } from './types/Error';
import { Post } from './types/Post';

export const getUsersList = () => {
  return client.get<User[] | Error>('/users');
};

export const getPostsUser = (id:number) => {
  return client.get<Post[] | Error>(`/posts?userId=${id}`);
};

export const getPost = (id: number) => {
  return client.get<Post | Error>(`/posts/${id}`);
};

export const getCommentsPost = (id: number) => {
  return client.get<Comment[] | Error>(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (data: Comment) => {
  return client.post<Comment | Error>('/comments', data);
};
