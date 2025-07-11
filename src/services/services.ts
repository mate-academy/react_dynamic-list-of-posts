import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getUserPosts = (user: number) => {
  return client.get<Post[]>(`/posts?userId=${user}`);
};

export const getPostsComments = (post: number) => {
  return client.get<Comment[]>(`/comments?postId=${post}`);
};

export const deletePostsComment = (comment: Comment) => {
  return client.delete(`/comments/${comment.id}`);
};

export const createPostsComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, { postId, name, email, body });
};
