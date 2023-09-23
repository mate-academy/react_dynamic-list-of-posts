import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getPosts = (selectedUser: User): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${selectedUser.id}`);
};

export const getComments = (selectedPost: Post): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${selectedPost.id}`);
};
