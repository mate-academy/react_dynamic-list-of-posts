import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { Post } from '../types/Post';

//USER

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

// POST

export const getPostByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

// COMMENTS

export const getCommentByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comment/$postId=${postId}`);
};

// delete

export const deleteComment = (commentId: number) => {
  return client.delete<Comment[]>(`/comment/${commentId}`);
};

// add

export const addComment = ({  userId, title, body}: Omit<Post, 'id'>) => {
  return client.post<Comment[]>('/comment', {
    userId: userId,
    title: title,
    body: body,
  });
};
