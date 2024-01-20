import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { client } from '../fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};
