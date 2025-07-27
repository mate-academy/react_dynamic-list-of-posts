import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const UsersAPI = {
  getAll: () => client.get<User[]>(`/users`),
  getSingleUser: (id: number) => client.get<User>(`/users/${id}`),
};

export const PostsAPI = {
  getPostById: (id: number) => client.get<Post>(`/posts/${id}`),
  getPostsByUserId: (userId: number) =>
    client.get<Post[]>(`/posts?userId=${userId}`),
};

export const CommentsAPI = {
  getCommentsByPostId: (postId: number) =>
    client.get<Comment[]>(`/comments?postId=${postId}`),
  addComment: (newComment: CommentData) =>
    client.post<Comment>(`/comments`, newComment),
  deleteComment: (id: number) => client.delete(`/comments/${id}`),
};
