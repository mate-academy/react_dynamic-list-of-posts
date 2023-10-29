import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getPosts = (selectedUser: User): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${selectedUser.id}`);
};

export const getComments = (selectedPost: Post): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${selectedPost.id}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};
