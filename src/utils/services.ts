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
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

// delete

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

// create

export const addComment = ({
  name,
  email,
  body,
  postId,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    name,
    email,
    body,
    postId,
  });
};
