import { client } from '../../src/utils/fetchClient';
import { Post } from '../../src/types/Post';
import { User } from '../../src/types/User';
import { Comment, CommentData } from '../../src/types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (commentData: CommentData, postId: number) => {
  return client.post<Comment>(`/comments`, {
    ...commentData,
    postId: postId,
  });
};

export const deleteComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};
