import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from './fetchClient';

//USERS
export const getUsers = () => {
  return client.get<User[]>('/users');
};

//POST
export const getPostByUserId = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

//COMMENTS
export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postCommentsByPostId = (
  postId: number,
  comment: Omit<Comment, 'id'>,
) => {
  return client.post<Comment>(`/comments`, {
    postId: postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  });
};

export const deleteCommentsByPostId = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
